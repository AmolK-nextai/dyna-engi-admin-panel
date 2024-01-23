const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const inquiryService = {
    
  createInquiry: async (req, res) => {
    try {
      const { email, phone, message, active } = req.body;
      const inquiry = await prisma.inquiry.create({
        data: { email, phone, message, active },
      });
      res.json(inquiry);
    } catch (error) {
      console.error('Error creating inquiry:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  },

  updateInquiry: async (req, res) => {
    const { id } = req.params;
    const { email, phone, message, active } = req.body;

    try {
      const updatedInquiry = await prisma.inquiry.update({
        where: { id: parseInt(id) },
        data: { email, phone, message, active },
      });
      res.json(updatedInquiry);
    } catch (error) {
      console.error('Error updating inquiry:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  },

  deleteInquiry: async (req, res) => {
    const { id } = req.params;

    try {
      await prisma.inquiry.delete({
        where: { id: parseInt(id) },
      });
      res.json({ message: 'Inquiry deleted successfully' });
    } catch (error) {
      console.error('Error deleting inquiry:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  },

  getAllInquiries: async (req, res) => {
    try {
      const inquiries = await prisma.inquiry.findMany();
      res.json(inquiries);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  },
  getInquiryById: async (req, res) => {
    const { id } = req.params;

    try {
      const inquiry = await prisma.inquiry.findUnique({
        where: { id: parseInt(id) },
      });

      if (!inquiry) {
        return res.status(404).json({ error: 'Inquiry not found' });
      }

      res.json(inquiry);
    } catch (error) {
      console.error('Error fetching inquiry by ID:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  }
};

module.exports = inquiryService;
