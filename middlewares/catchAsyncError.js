const catchAsyncError = (passedFucntion) => (req, res, next) => {
  Promise.resolve(passedFucntion(req, res, next)).catch(next);
};

export default catchAsyncError;
