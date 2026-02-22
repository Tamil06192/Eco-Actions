import new1 from '../assets/images/new1.jpg';
import new2 from '../assets/images/new2.jpg';
import new3 from '../assets/images/new3.jpg';
import new4 from '../assets/images/new4.jpg';
import new5 from '../assets/images/new5.jpg';
import sewageIcon from '../assets/images/report-sewage.svg';
import industrialIcon from '../assets/images/report-industrial.svg';
import garbageIcon from '../assets/images/report-garbage.svg';
import deforestationIcon from '../assets/images/report-deforestation.svg';

export const MOCK_DATA_VERSION = '2.1';

export const mockReports = [
    {
        id: 1,
        title: "Illegal Dumping near Highway",
        description: "Large pile of construction debris dumped on the side of the road.",
        location: "45.123, -93.456",
        status: "Open",
        date: "2024-03-10",
        image: new1,
        category: "Garbage",
        reporter: "user1"
    },
    {
        id: 2,
        title: "Sewage Leak in Park",
        description: "Foul smell and visible leakage near the playground area.",
        location: "45.124, -93.457",
        status: "In Progress",
        date: "2024-03-09",
        image: sewageIcon,
        category: "Sewage",
        reporter: "user2"
    },
    {
        id: 3,
        title: "Tree Cutting in Protected Zone",
        description: "Several large trees cut down illegally in the conservation area.",
        location: "45.125, -93.458",
        status: "Solved",
        date: "2024-03-08",
        image: new2,
        category: "Deforestation",
        reporter: "user1"
    },
    {
        id: 4,
        title: "Plastic Waste on Beach",
        description: "Hundreds of plastic bottles washed up on the shore.",
        location: "45.126, -93.459",
        status: "Open",
        date: "2024-03-07",
        image: new3,
        category: "Garbage",
        reporter: "user2"
    },
    {
        id: 5,
        title: "Industrial Smoke",
        description: "Black smoke rising from factory chimney during night time.",
        location: "45.127, -93.460",
        status: "Open",
        date: "2024-03-06",
        image: industrialIcon,
        category: "Air Pollution",
        reporter: "user1"
    },
    {
        id: 6,
        title: "Oil Spill in River",
        description: "Oil slick observed floating downstream near the bridge.",
        location: "45.128, -93.461",
        status: "In Progress",
        date: "2024-03-05",
        image: sewageIcon,
        category: "Water Pollution",
        reporter: "user2"
    },
    {
        id: 7,
        title: "Noise Pollution from Club",
        description: "Loud music playing past midnight disturbing the neighborhood.",
        location: "45.129, -93.462",
        status: "Solved",
        date: "2024-03-04",
        image: new4,
        category: "Noise Pollution",
        reporter: "user1"
    },
    {
        id: 8,
        title: "Overflowing Dumpster",
        description: "Apartment complex dumpster overflowing with trash bags.",
        location: "45.130, -93.463",
        status: "Open",
        date: "2024-03-03",
        image: new5,
        category: "Garbage",
        reporter: "user2"
    },
    {
        id: 9,
        title: "Dead Fish in Lake",
        description: "Multiple dead fish spotted near the boat ramp.",
        location: "45.131, -93.464",
        status: "Open",
        date: "2024-03-02",
        image: sewageIcon,
        category: "Water Pollution",
        reporter: "user1"
    },
    {
        id: 10,
        title: "Unattended Campfire",
        description: "Smoldering campfire left near dry brush.",
        location: "45.132, -93.465",
        status: "Solved",
        date: "2024-03-01",
        image: new1,
        category: "Fire Hazard",
        reporter: "user2"
    },
    {
        id: 11,
        title: "Chemical Barrels Dumped",
        description: "Rusted barrels leaking unknown substance in vacant lot.",
        location: "45.133, -93.466",
        status: "Open",
        date: "2024-02-28",
        image: industrialIcon,
        category: "Chemical Waste",
        reporter: "user1"
    },
    {
        id: 12,
        title: "Soil Erosion",
        description: "Construction site runoff causing severe soil erosion.",
        location: "45.134, -93.467",
        status: "In Progress",
        date: "2024-02-27",
        image: new2,
        category: "Land Degradation",
        reporter: "user2"
    }
];

export const usersArray = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "user" },
    { id: 2, name: "Admin User", email: "admin@example.com", role: "admin" }
];
