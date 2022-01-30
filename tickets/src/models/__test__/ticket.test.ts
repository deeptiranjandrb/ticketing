import { Ticket } from '../ticket';

it('implements optimistic concurrency control', async () => {
    // Create an instance of a ticket
    const ticket = Ticket.build({
        title: 'concert',
        price: 5,
        userId: '123'
    });
    // Save the ticke to the database
    await ticket.save();
    // fetch the ticket twice
    const firstInstance = await Ticket.findById(ticket.id);
    const secondInstance = await Ticket.findById(ticket.id);
    // make two seprate changes to the tickets we fetched
    firstInstance!.set({price: 10});
    secondInstance!.set({price:15});
    // save the first fetched ticket
    await firstInstance!.save();
    // save the secode fetched ticket and expect an error
    try{
        await secondInstance!.save();
    } catch(err) {
        return;
    }
    throw new Error('Should not reach this point');
});

it('increments the version number on multiple saves', async () => {
    const ticket = Ticket.build({
        title: 'concert',
        price: 4,
        userId: '122312'
    });

    await ticket.save();
    expect(ticket.version).toEqual(0);
    await ticket.save();
    expect(ticket.version).toEqual(1);
    await ticket.save();
    expect(ticket.version).toEqual(2);
    await ticket.save();
    expect(ticket.version).toEqual(3);
})