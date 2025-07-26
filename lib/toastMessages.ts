export const getAuthMessages = (authTxts: (key: string) => string) => ({
  registerSuccessed: authTxts('registerSuccessed'),
  verificationCode: authTxts('verificationCode'),
  loginFailed: authTxts('loginFailed'),
  verifiedSuccessfullyCode: authTxts('VerifiedSuccessfullyCode'),
  verificationFailedCode: authTxts('verificationFailedCode'),
  logoutSuccess: authTxts('logoutSuccess'),
});
