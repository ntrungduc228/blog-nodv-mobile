import Svg, {Path} from 'react-native-svg';

export const BookmarkListIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    aria-label="Lists"
    {...props}>
    <Path
      d="M7.5 5.75a2 2 0 0 0-2 2v14a.5.5 0 0 0 .8.4l5.7-4.4 5.7 4.4a.5.5 0 0 0 .8-.4v-14a2 2 0 0 0-2-2h-9z"
      fill="currentColor"
    />
    <Path
      d="M12.5 2.75h-8a2 2 0 0 0-2 2v11.5"
      stroke="currentColor"
      strokeLinecap="round"
    />
  </Svg>
);
