const DARK = "dark_mode";
const LIGHT = "light_mode";
const PROFILE_PICTURE = "profile_picture";

export function lightModeAction(){
  return { type: LIGHT }
};

export function darkModeAction(){
  return { type: DARK }
};

export function updateProfilePic() {
  return { type: PROFILE_PICTURE }
};

const initialState = {
  isDark: false,
  profilePicture: ""
};

export default function accountPrefReducer(state = initialState, action) {
  switch (action.type) {
    case "dark_mode":
      return { ...state, isDark: true };
    case "light_mode":
      return { ...state, isDark: false };
    case "profile_picture":
      return { ...state, profilePicture: action.payload }
    default:
      return state;
  }
}