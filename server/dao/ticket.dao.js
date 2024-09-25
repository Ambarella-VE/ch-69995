// server/dao/ticket.dao.js
import Ticket from '../models/ticket.model.js';

class TicketDAO {
  async create(ticketData) {
    const ticket = new Ticket(ticketData);
    return await ticket.save();
  }

  async findById(id) {
    return await Ticket.findById(id);
  }

  async findAll() {
    return await Ticket.find();
  }
}

export default new TicketDAO();
