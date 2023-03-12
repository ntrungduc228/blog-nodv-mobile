const commentsByParentId = comments => {
  const group = {};
  comments.forEach(comment => {
    group[comment.replyId] ||= [];
    group[comment.replyId].push(comment);
  });
  return group;
};

export default commentsByParentId;
