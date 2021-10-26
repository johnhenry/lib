export default (nums0, nums1) => {
  for (let i = 0; i < nums0.length; i++) {
    const s0 = nums0[i];
    const s1 = nums1[i];
    if (s0 > s1) {
      return 1;
    }
    if (s1 > s0) {
      return -1;
    }
  }
};
