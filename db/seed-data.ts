
interface SeedData {
    entries : SeedEntry[]
}

export interface SeedEntry {
    status: string;
    description: string;
    createdAt: number;
}

export const seedData: SeedData = {
    
        entries:[
        {
            description: "pending lorem ipsum dolor sit amet, consectetur adip",
            createdAt: Date.now(),
            status: 'pending'
        },
        {
            description: "in-progress lorem lorem lorem ipsum d",
            createdAt: Date.now()-300000,
            status: 'in-progress',
        },
        {
            description: "finished veniam tempor effice consectetur adip",
            createdAt: Date.now()-100000,
            status: 'finished',
        }
    ]
}