import fs from 'fs';
import path from 'path';

export default async(client: any) => {
    const eventList: string[] = [];
    const eventDir: string = path.join(__dirname, '../events');
    console.log('Loading events...');
    fs.readdirSync(eventDir).filter(
        (file: string) => file.endsWith('.js') || file.endsWith('.ts')
        ).forEach(async events => {
        await import(`../events/${events}`).then((events: any) => {
            events.default(client)});
            eventList.push(events);
            console.log(`Loaded ${events}`);
        });
    console.log('Loaded all events!');
};