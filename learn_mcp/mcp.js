
// mcp.js

const contextDB = {
    phantasia: [
        { title: "Fireworks Festival", date: "2024-12-31", location: "Central Park" },
        { title: "Tech Meetup", date: "2024-11-15", location: "Cyber Hub" },
    ],
        tel_aviv: [
        { title: "Pride parade", date: "2024-12-31", location: "Beach zone" },
        { title: "Barbeque", date: "2024-11-15", location: "Park Yarkon" },
    ],
        haifa: [
        { title: "Food market", date: "2024-12-31", location: "Grand Qanion Mall" },
        { title: "Car sale", date: "2024-11-15", location: "Motogur, Big" },
    ],
};

function getEvents(cityName) {
    return contextDB[cityName.toLowerCase()] || [];
}

export { getEvents };
