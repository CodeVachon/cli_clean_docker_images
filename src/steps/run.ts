import { DockerAPI } from "../utls/DockerApi";

export const run = async (): Promise<void> => {
    console.log("Run");
    const docker = new DockerAPI();

    const images = await docker.getImageList();
    // const rmiTargets = imagesByRepo.;
    const processes = await docker.processesWithThereImages();
    // console.dir({ processes, images }, { depth: null });

    const unusedByRepos = new Map<string, typeof images>();
    const poppedArrayOfUnusedRepos = [];
    const keepedArrayOfUnusedRepos = [];

    for (const image of images) {
        const isInUse = processes.some((process) => process.repository?.imageId === image.imageId);

        if (!isInUse) {
            const current = unusedByRepos.get(image.name) ?? [];
            current.push(image);

            unusedByRepos.set(image.name, current);
        } else {
            keepedArrayOfUnusedRepos.push(image);
        }
    }

    for (const unusedByRepo of unusedByRepos.values()) {
        if (unusedByRepo.length > 1) {
            const [keeper, ...removableImages] = unusedByRepo;
            keepedArrayOfUnusedRepos.push(keeper);
            for (const removableImage of removableImages) {
                poppedArrayOfUnusedRepos.push(removableImage);
            }
        } else {
            keepedArrayOfUnusedRepos.push(unusedByRepo[0]);
        }
    }

    for (const record of keepedArrayOfUnusedRepos) {
        console.log(`Keeping ${record.name}:${Array.from(record.tags).join(",")}`);
    }

    if (poppedArrayOfUnusedRepos.length > 0) {
        poppedArrayOfUnusedRepos.forEach((record) => {
            console.log(`Remove ${record.name}:${Array.from(record.tags).join(", ")}`);
        });

        docker.rmi(poppedArrayOfUnusedRepos.map((record) => record.imageId));
    } else {
        console.log("No Images Found to Remove");
    }

    return;
};
