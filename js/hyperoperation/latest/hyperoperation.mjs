// public static long hyper(long a,b, int n){

// if(n==1) return a+b;

// if(n<=0) return 0;

// long r=0;

// for(long i=b-1; i!=0; i--){

//   if(r==0) r=hyper(a, a, n-1);

//   else r=hyper(a, r, n-1);

// }

// return r;

// }
const hyper = (a, b, n) => {
  if (n < 0) {
    return 0;
  }
  if (n === 0) {
    return a + 1;
  }
  if (n === 1) {
    return a + b;
  }

  let r = 0;

  for (let i = b - 1; i !== 0; i--) {
    if (r == 0) {
      r = hyper(a, a, n - 1);
    } else {
      r = hyper(a, r, n - 1);
    }

    return r;
  }
};

export default hyper;
