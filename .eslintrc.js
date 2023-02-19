module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, {extensions: ['.js', '.jsx']}],
    'react-native/no-inline-styles': 'off',
    quotes: [2, 'single', {avoidEscape: true, allowTemplateLiterals: true}],
  },
};
