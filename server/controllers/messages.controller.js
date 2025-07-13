const messagesService = require('../service/messages.service');
const reservationService = require('../service/reservations.service');


exports.createMessage = async (req, res) => {
    try {
        const { reservation_id, message_type, message_content } = req.body;
        const user_id = req.user?.id; 
        
        if (!reservation_id || !message_type || !message_content) {
            return res.status(400).json({ 
                error: 'חסרים נתונים נדרשים: reservation_id, message_type, message_content' 
            });
        }
        
        if (!['cancel', 'update'].includes(message_type)) {
            return res.status(400).json({ 
                error: 'סוג הודעה לא תקין. חייב להיות cancel או update' 
            });
        }
        
        const reservation = await reservationService.getReservationById(reservation_id);
        if (!reservation) {
            return res.status(404).json({ error: 'ההזמנה לא נמצאה' });
        }
        const messageData = {
            reservation_id,
            user_id,
            message_type,
            message_content: message_content.trim()
        };
        
        const newMessage = await messagesService.createManagerMessage(messageData);

        const io = req.app.get('io');
        io.to('admin').emit('newAdminMessage', newMessage);
        
        res.status(201).json({
            message: 'ההודעה נשלחה בהצלחה למנהל',
            data: newMessage
        });
        
    } catch (error) {
        console.error('Error creating manager message:', error);
        res.status(500).json({ error: 'שגיאה בשליחת ההודעה למנהל' });
    }
};

exports.getAllManagerMessages = async (req, res) => {
    try {
        const messages = await messagesService.getAllManagerMessages();
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: 'שגיאה בטעינת כל ההודעות' });
    }
};


exports.deleteMessage = async (req, res) => {
  const { id } = req.params;
  try {
    await messagesService.deleteManagerMessage(id);
    res.status(200).json({ message: 'ההודעה נמחקה בהצלחה' });
  } catch (error) {
    res.status(500).json({ error: 'שגיאה במחיקת ההודעה' });
  }
};