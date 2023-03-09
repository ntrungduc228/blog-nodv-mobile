import {ListItemIcon, MenuItem, MenuList} from '@mui/material';
import {useMemo} from 'react';
import {List} from 'react-native-paper';
import {Text, View} from 'react-native';
import {EditIcon, FlagIcon, TrashIcon} from '../../../../components/Icons';

const CommentMenu = ({onEdit, onDelete, onReport, isUser}) => {
  // const Items = useMemo(() => {
  //   if (isUser)
  //     return (
  //       <List.Item title="Edit">
  //         <MenuItem className="text-sm" onClick={onEdit}>
  //           <ListItemIcon>
  //             <EditIcon />
  //           </ListItemIcon>
  //           Edit this comment
  //         </MenuItem>
  //         <MenuItem className="text-sm" onClick={onDelete}>
  //           <ListItemIcon>
  //             <TrashIcon />
  //           </ListItemIcon>
  //           Delete
  //         </MenuItem>
  //       </List.Item>
  //     );
  //   return (
  //     <MenuList>
  //       <MenuItem className="text-sm" onClick={onReport}>
  //         <ListItemIcon>
  //           <FlagIcon />
  //         </ListItemIcon>
  //         Report this comment
  //       </MenuItem>
  //     </MenuList>
  //   );
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isUser]);

  return (
    <View className="flex flex-col justify-end bg-white">
      <Text>vi</Text>
    </View>
  );
};

export default CommentMenu;
