import React, { useState } from "react";
import { Box, Card, CardContent, Collapse } from "@mui/material";
import ApiService from "../../../ApiService";
import CommentHeader from "./CommentHeader";
import CommentActions from "./CommentActions";
import CommentForm from "./CommentForm";
import { useGlobalMessage } from "../../GlobalMessageContext"; 

const Comment = ({
  comment,
  currentUser,
  onRefresh,
  setLoading,
  depth = 0,
}) => {
  const { showMessage } = useGlobalMessage(); 
  const [loading, setLocalLoading] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    body: comment.body,
    rating: comment.rating || 0,
  });
  const [showReplies, setShowReplies] = useState(true);
  const canModify = currentUser?.id && comment.user_id === currentUser.id;
  const isMainComment = depth === 0;

  const handleReplySubmit = async () => {
    if (!replyText.trim()) {
      showMessage("יש למלא את תוכן התגובה", "error");
      return;
    }
    const replyData = {
      user_id: currentUser.id,
      name: currentUser.username,
      email: currentUser.email,
      body: replyText,
    };
    try {
      setLocalLoading(true);
      setLoading(true);
      await ApiService.request({
        endPath: `comments/${comment.id}/replies`,
        method: "POST",
        body: replyData,
        credentials: 'include',
      });
      showMessage("התגובה נוספה בהצלחה!", "success");
      setReplyText("");
      setShowReplyForm(false);
      await onRefresh();
    } catch (err) {
      showMessage("שגיאה בהוספת תגובה", "error");
    } finally {
      setLocalLoading(false);
      setLoading(false);
    }
  };

  const handleEditSubmit = async () => {
    if (!editData.body.trim()) {
      showMessage("יש למלא את תוכן התגובה", "error");
      return;
    }
    if (isMainComment && editData.rating === 0) {
      showMessage("יש לבחור דירוג", "error");
      return;
    }

    const updated = {
      ...editData,
      user_id: currentUser.id,
      name: currentUser.username,
      email: currentUser.email,
    };

    try {
      setLocalLoading(true);
      setLoading(true);
      await ApiService.request({
        endPath: `comments/${comment.id}`,
        method: "PUT",
        body: updated,
        credentials: 'include',
      });
      showMessage("התגובה עודכנה בהצלחה!", "success");
      setIsEditing(false);
      await onRefresh();
    } catch (err) {
      showMessage("שגיאה בעדכון התגובה", "error");
    } finally {
      setLocalLoading(false);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLocalLoading(true);
      setLoading(true);
      await ApiService.request({ endPath: `comments/${comment.id}`, method: "DELETE", credentials: 'include' });
      showMessage("התגובה נמחקה בהצלחה!", "success");
      await onRefresh();
    } catch (err) {
      showMessage("שגיאה במחיקת תגובה", "error");
    } finally {
      setLocalLoading(false);
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Card
        elevation={depth > 0 ? 1 : 3}
        sx={{
          backgroundColor: depth > 0 ? "#f8f9fa" : "white",
          ml: depth * 3,
        }}
      >
        <CardContent>
          <CommentHeader comment={comment} canModify={canModify} isMain={isMainComment} />
          {isEditing ? (
            <CommentForm
              isEdit
              editData={editData}
              setEditData={setEditData}
              onCancel={() => setIsEditing(false)}
              onSubmit={handleEditSubmit}
              isMain={isMainComment}
              loading={loading}
            />
          ) : (
            <Box sx={{ mb: 2 }}>{comment.body}</Box>
          )}

          <CommentActions
            canModify={canModify}
            hasReplies={comment.replies?.length > 0}
            showReplies={showReplies}
            setShowReplies={setShowReplies}
            setIsEditing={setIsEditing}
            onDelete={handleDelete}
            showReplyForm={showReplyForm}
            setShowReplyForm={setShowReplyForm}
            loading={loading}
          />
          {showReplyForm && (
            <CommentForm
              replyTo={comment.name}
              replyText={replyText}
              setReplyText={setReplyText}
              onSubmit={handleReplySubmit}
              onCancel={() => setShowReplyForm(false)}
              loading={loading}
            />
          )}
        </CardContent>
      </Card>

      <Collapse in={showReplies}>
        {comment.replies?.map((reply) => (
          <Comment
            key={reply.id}
            comment={reply}
            currentUser={currentUser}
            onRefresh={onRefresh}
            setLoading={setLoading}
            depth={depth + 1}
          />
        ))}
      </Collapse>
    </Box>
  );
};

export default Comment;
