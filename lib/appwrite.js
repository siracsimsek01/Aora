import {
  Account,
  Avatars,
  Client,
  ID,
  Databases,
  Storage,
  Query,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.simsekdev.aora",
  projectId: "663e44d20037df6f0829",
  databaseId: "663e4683002a9096070a",
  userCollectionId: "663e46ba0004362aba96",
  videoCollectionId: "663e46e1001c46c4c241",
  storageId: "663e4838003b23089873",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register user
export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}

// Sign In
export const signIn = async (email, password) => {
  try {
    // Check if there's an active session
    const currentSession = await getCurrentSession();
    if (currentSession) {
      console.log('Session active:', currentSession);
      return currentSession;
    }

    // Create a new session if none exists
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
};

// Get current session
export const getCurrentSession = async () => {
  try {
    const sessions = await account.listSessions();
    if (sessions.total > 0) {
      return sessions.sessions[0]; // Return the first active session
    }
    return null;
  } catch (error) {
    console.log('No active session:', error.message);
    return null;
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    throw new Error(error);
  }
};
