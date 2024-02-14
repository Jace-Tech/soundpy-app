type AuthResult = {
  accessToken: string;
  user: {
    uid: string;
    username: string;
  };
};

type GenreType = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: string;
};

type UploadData = {
  contentImage: string;
  contentTitle: string;
  duration: number;
  price?: number;
  features?: string[];
  genre: string;
};

type FollowType = {
  _id: string;
  follower: UserData;
  user: UserData;
  date: string;
};

type PlaylistType = {
  _id: string;
  content: ContentFeedType;
  user: UserData;
  lastTimePlayed: string;
};

type ProfileData = {
  _id: string;
  userId: string;
  bio: string;
  email: string | null;
  coverImage: string | null;
  musicName: string | null;
  gender: string | null;
  profileImage: string | null;
  shadowBanned: boolean;
  isVerified: boolean;
  accessToken: string;
  password: null;
  isActive: boolean;
  dateRegistered: boolean;
  username: string;
  country: string;
  isSubscribed: boolean;
  lastSubcriptionDate: string | null;
  wallet: string | null;
  role: "user" | "admin";
  musicCareer: string | null;
  followers: FollowType[];
  following: FollowType[];
  xLink?: string;
  instaLink?: string;
  tiktokLink?: string;
};

type UserData = {
  _id?: string;
  username: string;
  country?: string;
  musicCareer?: string;
  musicName?: string;
  dateRegistered?: string;
  bio?: string;
  genre?: GenreType;
  profileImage?: string;
  coverImage?: string;
  shadowBanned?: boolean;
  isVerified?: boolean;
  isActive?: boolean;
  accessToken?: string;
  email?: string;
  role?: string;
  xLink?: string;
  instaLink?: string;
  tiktokLink?: string;
};

interface PaymentDTO {
  amount: number;
  user_uid: string;
  created_at: string;
  identifier: string;
  metadata: unknown;
  memo: string;
  status: {
    developer_approved: boolean;
    transaction_verified: boolean;
    developer_completed: boolean;
    cancelled: boolean;
    user_cancelled: boolean;
  };
  to_address: string;
  transaction: null | {
    s;
    txid: string;
    verified: boolean;
    _link: string;
  };
}

type CurrentStateType = "base" | "record" | "camera" | "resource";

type ContentType = "song" | "beat" | "music-video" | "";

type ContentDataType = {
  contentUrl: string;
  coverImage: string;
  createdAt: string;
  date: string;
  displayDurationEnd: null;
  displayDurationStart: null;
  features: string[];
  genre: string;
  isDeleted: boolean;
  price: number;
  title: string;
  type: ContentType;
  updatedAt: string;
};

type LikeDataType = {
  content: ContentDataType;
  createdAt: string;
  updatedAt: string;
  user: UserData;
  __v: number;
  _id: string;
};

type PaymentDataType = "content" | "subscription" | "message" | "stake";

type AppSettingsData = {
  contentPrice: number;
  subscriptionPrice: number;
  appName: string;
  stakePrice: number;
};

type PaidType = {
  _id: string;
  amount: number;
  status: string;
  piPaymentId: string;
  user: string;
  trxId: string;
  desc: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  meta: {
    identifier: string;
    user_uid: string;
    amount: number;
    memo: string;
    metadata: {
      stakePrice: number;
    };
    from_address: string;
    to_address: string;
    direction: "user_to_app" | "app_to_user";
    status: {
      developer_approved: boolean;
      transaction_verified: boolean;
      developer_completed: boolean;
      cancelled: boolean;
      user_cancelled: boolean;
    };
    transaction: {
      txid: string;
      verified: boolean;
      _link: string;
    };
    created_at: string;
    network: "Pi Testnet" | "Pi Network";
  };
};

type MetaType = {
  identifier: string;
  user_uid: string;
  amount: number;
  memo: string;
  metadata: any;
  from_address: string;
  to_address: string;
  direction: "user_to_app" | "app_to_user";
  status: {
    developer_approved: boolean;
    transaction_verified: boolean;
    developer_completed: boolean;
    cancelled: boolean;
    user_cancelled: boolean;
  };
  transaction: {
    txid: string;
    verified: boolean;
    _link: string;
  } | null;
  created_at: string;
  network: "Pi Testnet" | "Pi Network";
};

type HashType = {
  memo: string;
  memo_bytes: string;
  _links: {
    self: {
      href: string;
    };
    account: {
      href: string;
    };
    ledger: {
      href: string;
    };
    operations: {
      href: string;
      templated: true;
    };
    effects: {
      href: string;
      templated: true;
    };
    precedes: {
      href: string;
    };
    succeeds: {
      href: string;
    };
    transaction: {
      href: string;
    };
  };
  id: string;
  paging_token: string;
  successful: true;
  hash: string;
  ledger: number;
  created_at: string;
  source_account: string;
  source_account_sequence: string;
  fee_account: string;
  fee_charged: string;
  max_fee: string;
  operation_count: 1;
  envelope_xdr: string;
  result_xdr: string;
  result_meta_xdr: string;
  fee_meta_xdr: string;
  memo_type: string;
  signatures: string[];
  valid_after: string;
  valid_before: string;
};

type TransactionDataType = {
  _id: string;
  amount: number;
  status: "pending" | "success" | "cancelled" | "error";
  piPaymentId: string;
  user: UserData;
  trxId: string;
  meta: MetaType;
  desc: string;
  createdAt: string;
  type: "content" | "subscription" | "message" | "stake";
  isCredit: boolean;
};

type ReplyType = {
  _id: string;
  user: UserData;
  comment: CommentType;
  reply: string;
  date: string;
}

type CommentReply = {
  _id: string;
  user: UserData;
  content: {
    _id: string;
    user: string;
    type: string;
    features: string[];
    title: string;
    genre: string;
    coverImage: string;
    contentUrl: string;
    price: null;
    displayCutUrl: null;
    metadata: any;
    isDeleted: false;
    isActive: true;
    date: string;
    createdAt: string;
    updatedAt: string;
  };
  comment: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  reply: ReplyType[];
};

type ContentFeedType = {
  comments: number;
  contentUrl: string;
  coverImage: string;
  createdAt: string;
  date: string;
  displayCutUrl: string | null;
  features: string[];
  genre: GenreType;
  isDeleted: boolean;
  isPurchased: boolean;
  isLiked: boolean;
  isMine: boolean;
  likes: number;
  playlists: number;
  price: number;
  title: string;
  type: ContentType;
  updatedAt: string;
  user: UserData;
  __v: number;
  _id: string;
};

type PaymentType = {
  amount: number;
  memo: string;
  metadata: any;
};

type TokenData = {
  token: string;
  tokenexpiryTime: string;
};

type CommentType = {
  _id: string;
  user: UserData;
  content: ContentFeedType;
  comment: string;
  date: string;
};

type PaymentCallbacks = {
  onReadyForServerApproval: (paymentId: string) => any;
  onReadyForServerCompletion: (paymentId: string, txid: string) => any;
  onCancel: (paymentId: string) => any;
  onError: (error: string, payment?: PaymentDTO) => any;
};

declare interface Window {
  Pi: {
    authenticate: (
      scope: string[],
      handlePendingPayment?: (payment: PaymentDTO) => unknown
    ) => Promise<AuthResult>;
    createPayment: (payData: PaymentType, callbacks: PaymentCallbacks) => void;
    openShareDialog(title: string, message: string): void;
  };
}
