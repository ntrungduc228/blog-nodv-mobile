import {NotificationType} from '../config/dataType';
//import {appRoutes} from '../routes/AppRoutes';

export const callApiCreateNotification = (data, type, callApi, userId) => {
  let notification = {type: type};
  switch (type) {
    case NotificationType.LIKE:
      notification.link = 'hihi';
      // `${appRoutes.POST}/${data.id}`;
      notification.receiverId = 'hihi';
      // `${data.userId}`;
      if (userId !== data.userId) callApi.mutate(notification);
      break;
    case NotificationType.LIKECOMMENT:
      notification.link = 'hihi';
      //`${appRoutes.POST}/${data.postId}`;
      notification.receiverId = `${data.userId}`;
      if (userId !== data.userId) callApi.mutate(notification);
      break;
    case NotificationType.COMMENT:
      notification.link = 'hihi';
      //`${appRoutes.POST}/${data.postId}`;
      notification.receiverId = `${data.postUserId}`;
      if (userId !== data.postUserId) callApi.mutate(notification);
      break;
    case NotificationType.REPLYCOMMENT:
      notification.link = 'hihi'; //`${appRoutes.POST}/${data.postId}`;
      notification.receiverId = `${data.commentParentUserId}`;
      if (userId !== data.commentParentUserId) callApi.mutate(notification);
      break;
    case NotificationType.FOLLOW:
      notification.link = 'hihi'; // `${appRoutes.PROFILE}/${userId}`; //email
      notification.receiverId = `${data.id}`;
      if (userId !== data.email) callApi.mutate(notification);
      break;
    default:
      notification.link = 'hihi'; //`/users/${userId}`;
      notification.receiverId = `${data}`;
      if (userId !== data.id) callApi.mutate(notification);
  }

  return notification;
};
