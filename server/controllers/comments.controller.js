const commentsService = require('../service/comments.service');

exports.getAllComments = async (req, res) => {
    try {
        const comments = await commentsService.getAllComments();
        const map = {};
        comments.forEach(row => map[row.id] = { ...row, replies: [] });
        const tree = [];
        comments.forEach(row => {
            if (row.parent_id) {
                map[row.parent_id]?.replies.push(map[row.id]);
            } else {
                tree.push(map[row.id]);
            }
        });
        
        res.status(200).json(tree || []);
    } catch (error) {
        console.error('Error in getAllComments controller:', error);
        res.status(500).json({ 
            error: 'שגיאה בטעינת התגובות',
            details: error.message 
        });
    }
};

exports.createComment = async (req, res) => {
    try {
        const { user_id, name, email, body, parent_id, rating } = req.body;
        
        if (!name || !email || !body || !user_id) {
            return res.status(400).json({ 
                error: 'שדות חובה חסרים: שם, אימייל, מזהה משתמש ותוכן התגובה נדרשים' 
            });
        }

        if (!parent_id && (!rating || rating < 1 || rating > 5)) {
            return res.status(400).json({ error: 'דירוג חובה בתגובות ראשיות ויש להיות בין 1 ל-5' });
        }

        if (parent_id) {
            const parentExists = await commentsService.checkParentExists(parent_id);
            if (!parentExists) {
                return res.status(404).json({ error: 'התגובה הראשית לא נמצאה' });
            }
        }

        const newComment = await commentsService.createComment({
            user_id,
            name: name.trim(),
            email: email.trim(),
            body: body.trim(),
            parent_id: parent_id || null,
            rating: parent_id ? null : rating 
        });

        res.status(201).json({
            ...newComment,
            replies: [] 
        });
    } catch (error) {
        console.error('Error in createComment controller:', error);
        res.status(500).json({ 
            error: 'שגיאה בהוספת התגובה',
            details: error.message 
        });
    }
};

exports.updateComment = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, email, body, rating } = req.body;
        
        if ( !body) {
            return res.status(400).json({ 
                error: 'שדה תוכן התגובה חובה' 
            });
        }
        
        const existingComment = await commentsService.getCommentById(id);
        if (!existingComment) {
            return res.status(404).json({ error: `תגובה עם מזהה ${id} לא נמצאה` });
        }

        if (!existingComment.parent_id && (!rating || rating < 1 || rating > 5)) {
            return res.status(400).json({ error: 'דירוג חובה בתגובות ראשיות ויש להיות בין 1 ל-5' });
        }

        const updatedComment = await commentsService.updateComment(id, {
            name: name.trim(),
            email: email.trim(),
            body: body.trim(),
            rating: existingComment.parent_id ? null : rating
        });
        
        res.status(200).json(updatedComment);
    } catch (error) {
        console.error('Error in updateComment controller:', error);
        res.status(500).json({ 
            error: 'שגיאה בעדכון התגובה',
            details: error.message 
        });
    }
};

exports.removeComment = async (req, res) => {
    try {
        const id = req.params.id;
        
        const existingComment = await commentsService.getCommentById(id);
        if (!existingComment) {
            return res.status(404).json({ error: `תגובה עם מזהה ${id} לא נמצאה` });
        }

        const isDeleted = await commentsService.deleteComment(id);
        
        if (!isDeleted) {
            return res.status(500).json({ error: 'שגיאה במחיקת התגובה' });
        }
        
        res.status(200).json({ 
            message: `תגובה ${id} נמחקה בהצלחה`,
            success: true 
        });
    } catch (error) {
        console.error('Error in removeComment controller:', error);
        res.status(500).json({ 
            error: 'שגיאה במחיקת התגובה',
            details: error.message 
        });
    }
};

exports.createReply = async (req, res) => {
    try {
        const parentId = req.params.parentId;
        const { user_id, name, email, body } = req.body;
        
        if (!body) {
            return res.status(400).json({ 
                error: 'שדה תוכן התגובה חובה' 
            });
        }

        const parentComment = await commentsService.getCommentById(parentId);
        if (!parentComment) {
            return res.status(404).json({ error: 'התגובה הראשית לא נמצאה' });
        }

        const replyData = { 
            user_id,
            name: name.trim(), 
            email: email.trim(), 
            body: body.trim(), 
            parent_id: parentId,
            rating: null 
        };
        
        const newReply = await commentsService.createComment(replyData);
        
        res.status(201).json({
            ...newReply,
            replies: []
        });
    } catch (error) {
        console.error('Error in createReply controller:', error);
        res.status(500).json({ 
            error: 'שגיאה בהוספת התגובה',
            details: error.message 
        });
    }
};