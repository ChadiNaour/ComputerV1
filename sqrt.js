
 
 // Javascript implementation of the approach
  
 // Recursive function that returns
 // square root of a number with
 // precision upto 5 decimal places
 function Square(n, i, j)
 {
     var mid = ((i + j) / 2);
     var mul = mid * mid;
  
     // If mid itself is the square root,
     // return mid
     if ((mul == n) || (Math.abs(mul - n) < 0.00001))
         return mid;
  
     // If mul is less than n,
     // recur second half
     else if (mul < n)
         return Square(n, mid, j);
  
     // Else recur first half
     else
         return Square(n, i, mid);
 }
  
 // Function to find the square root of n
 function findSqrt(n)
 {
     var i = 1;
  
     // While the square root is not found
     var found = false;
     while (!found)
     {
          
         // If n is a perfect square
         if (i * i == n)
         {
            //  console.log("i is :",i);
             found = true;
             return (i);
         }
  
         else if (i * i > n)
         {
              
             // Square root will lie in the
             // interval i-1 and i
             var res = Square(n, i - 1, i);
            //  console.log("result is : ",res.toFixed(5));
             found = true;
             return (res);
         }
         i++;
     }
 }
  
 // Driver code
 var n = 0.25;
 var result;
  
 result = findSqrt(n);
 console.log(result);
 console.log(Math.sqrt(n));
  
 // This code is contributed by todaysgaurav
 ^((?:\-?\+?(?:\s+)?\d+(?:\.\d+)?(?:\s+)?(\*(?:\s+)?X(\^\d+|\d+(?:\.\d+)?)?)?)(?:(?:\s+)?\+(?:\s+)?|(?:\s+)?\-(?:\s+)?)?)+(?:\s+)?=(?:\s+)?((?:[+-]?\d+(?:\.\d+)?(?:\s+)?\*(?:\s+)?X\^\d+|\-?\d+(?:\.\d+)?)(?:(?:\s+)?\+(?:\s+)?|(?:\s+)?\-(?:\s+)?)?)+$


 ^((?:\-?\+?(?:\s+)?\d+(?:\.\d+)?(?:\s+)?(\*(?:\s+)?X(\^\d+|\d+(?:\.\d+)?)?)?)(?:(?:\s+)?\+(?:\s+)?|(?:\s+)?\-(?:\s+)?)?)+(?:\s+)?=(?:\s+)?((?:[+-]?\d+(?:\.\d+)?(?:\s+)?(\*(?:\s+)?X(\^\d+|\-?\d+(?:\.\d+)?)?)?)(?:(?:\s+)?\+(?:\s+)?|(?:\s+)?\-(?:\s+)?)?)+$