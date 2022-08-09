import { reverse$, dupe$, mapAsync$, drop$, transduceSync$, transduceAsync$, collect$ } from "../lib/std.mjs";
import { sum$, product$, mean$, count$, modes$, mode$, sort$ , sortD$, randmoize$, first$, last$, take$} from "../lib/stat.mjs";
import { transducers } from "../../index.mjs";

"hello world" @!; /* prints "hello world" */
Math.random() @!;
"" @!;
1 2 3 4 5 6 randmoize$ -> r;
r .! !{3} @!!;
"" @!;
1 2 3 sum$!{2} @!!;
1 2 3 dupe$!! @!!;
"" @!;

dupe$ product$ :!! -> [square$];
2 3 [dupe$ product$ :!!]! @!!;
2 3 dupe$ product$ :!{2} ! @!!;
2 3 square$! @!!;

dupe$ sum$ :!! -> [double$];
double$ square$ :!! -> [doublesquare$];
4 3 doublesquare$!! @!!;

"" @!;
3 4 5 async(x)=>x**4 mapAsync$!! @!! -> carol;
1 2 3 dupe$!! @!! -> dave;
[1 2 3] @!! -> eva;
3 square$ !! @!! -> [fiona];
"" @!;
[1 2 3]. transducers.map(x=>x*x) transduceSync$ !! .! @!! -> [x] ;
"" @!;
1 2 3 -> start;
7 8 9 -> end;
start .! 4 5 6 end .! @!!;
"" @!;
1 2 3 4 5 -> list;
list @!;
list .! count$!! -> [l];

list .! sum$!! ->[sum];
list .! product$!! ->[product];
list .! mean$!! ->[mean];
"sum" sum "product" product "mean" mean @!!;
"sum" list .! sum$!{l}
  "product" list .! product$!{l}
  "mean" list .! mean$!{l}
  @!!;
"sum" list .sum$!{l}
  "product" list .product$!{l}
  "mean" list .mean$!{l}
  @!!;

"" @!;

"" @!;
1 [2 3 4 5 6 product$!!] sum$!! @!!;
1 [2 3 4 5 6 product$!!]. sum$!! @!!;
[2 3 product$!!] [4 5 product$!!] sum$!! @!!;

1 2 3 -> [a,b,c];

c b a @!!;
