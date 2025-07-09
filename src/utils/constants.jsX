export const LOGO = "https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"

export const USER_AVATAR = "https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-88wkdmjrorckekha.jpg"

export const BG_IMG = "https://assets.nflxext.com/ffe/siteui/vlv3/39cd71fa-e2b4-49f1-aa5e-b93602b28c59/web/IN-en-20250428-TRIFECTA-perspective_760c6d52-3da5-44d7-bb30-ad2920b7021a_large.jpg"

const TMDB_KEY = import.meta.env.VITE_TMDB_KEY;

if (!TMDB_KEY) {
  throw new Error('❌ Missing TMDB API key! Set VITE_TMDB_KEY in your environment.');
}

export const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TMDB_KEY}`
  }
};


export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500"


export const SUPPORTED_LANGUAGES = [{identifier:"en",name:"English"},
  {identifier:"hindi",name:"Hindi"},
  {identifier:"spanish",name:"Spanish"}
]


export const getFirebaseAuthErrorMessage = (errorCode) => {
  console.log("Mapping Firebase errorCode:", errorCode);
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'This email is already in use. Try logging in instead.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/user-not-found':
      return 'No account found with this email.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/invalid-credential':
      return 'Invalid email or password. Please try again.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Try again later.';
    default:
      return `Unexpected error. Please try again.`;
  }
};






export const API_KEY = import.meta.env.VITE_API_KEY