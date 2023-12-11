import execa from "execa";
import { camelCase } from "./camelCase";

export class DockerAPI {
    private verbose = true;

    private logCmd(msg: string) {
        console.log(`[DockerAPI] ${msg}`);
    } // close logCmd

    private async cmd(command: string | Array<string>) {
        try {
            const { stdout, escapedCommand, stderr } = await execa.sync(
                "docker",
                command instanceof Array
                    ? command
                    : command
                          .split(new RegExp("\\s{1,}", "g"))
                          .map((v) => v.trim())
                          .filter((v) => v.length > 0)
            );

            if (this.verbose) {
                this.logCmd(`$ ${escapedCommand}`);
            }

            if (stderr && stderr.length > 0) {
                for (const line of stderr.split(new RegExp("[\n\r]{1,}", "g"))) {
                    this.logCmd(`> ${line}`);
                }
                throw new Error(stderr);
            }

            if (this.verbose) {
                for (const line of stdout.split(new RegExp("[\n\r]{1,}", "g"))) {
                    this.logCmd(`> ${line}`);
                }
            }

            return stdout;
        } catch (error) {
            console.error("Try Catch Error", error);
            throw error;
        } // close try
    } // close cmd

    public version() {
        return this.cmd("version");
    } // close version

    protected tabularStdOutToArray<T = Record<string, string>>(stdOut: string): Array<T> {
        const recordSet: Array<T> = [];

        const [rawHeaders, ...rows] = stdOut
            .split(new RegExp("[\n\r]{1,}", "g"))
            .map((v) => String(v ?? "").trim());
        const headers = rawHeaders
            .split(new RegExp("[\\s]{2,}", "g"))
            .map((v) => camelCase(String(v ?? "").toLowerCase()));

        for (const row of rows) {
            const record: Record<string, string> = {};
            const values = row.split(new RegExp("\\s{2,}", "g")).map((v) => String(v ?? "").trim());
            for (let i = 0; i < values.length; i++) {
                const value = values[i];
                record[headers[i]] = value;
            }
            recordSet.push(record as T);
        }

        return recordSet;
    } // close tabularStdOutToArray

    public async getImageList() {
        const raw = await this.cmd("images");

        const imageMap = new Map<
            string,
            { tags: Set<string>; name: string; size: string; created: string; imageId: string }
        >();

        const recordSet = this.tabularStdOutToArray<{
            repository: string;
            tag: string;
            imageId: string;
            created: string;
            size: string;
        }>(raw);

        for (const record of recordSet) {
            const current = imageMap.get(record.imageId) ?? {
                tags: new Set(),
                name: record.repository,
                size: record.size,
                created: record.created,
                imageId: record.imageId
            };

            current.tags.add(record.tag);

            imageMap.set(record.imageId, current);
        }

        return Array.from(imageMap.values());
    } // close getImageList

    public async processes() {
        const raw = await this.cmd(["ps", "-a"]);

        const recordSet = this.tabularStdOutToArray<{
            containerId: string;
            image: string;
            command: string;
            created: string;
            status: string;
            ports: string;
            names: string;
        }>(raw);

        return recordSet;
    } // close processes

    public async processesWithThereImages() {
        const processes = await this.processes();
        const images = await this.getImageList();

        return processes.map((process) => {
            const [imageName, tag] = process.image.split(":").map((v) => String(v ?? "").trim());

            return {
                ...process,
                repository: images.find((image) => image.name === imageName && image.tags.has(tag))
            };
        });
    } // close processesWithThereImages

    public async rmi(images: string | Array<string>): Promise<string> {
        if (typeof images === "string") {
            return this.rmi([images]);
        }

        const command = ["image", "rm", ...images, "-f"];
        const stdout = await this.cmd(command);
        return stdout;
    } // close rmi
} // close DockerAPI
