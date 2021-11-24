const general={
    data(){
        return{

        }
    },
    methods:{
        shuffleArray(array){
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1))
                const temp = array[i]
                array[i] = array[j]
                array[j] = temp
            }
            return array
        },
        findRandom(min, max, remove=1000){
            let random = Math.floor(min + Math.random()*(max+ 1 - (min)));
            if(random==remove)random=random+2
            return random;
        },
        simplySurds(num){
            let array = []
            for(let i=1; i<=Math.round(Math.sqrt(num)); i++){
        if(num%(i*i)==0)array.push(i*i)
      }
      if(num==0)
      return{
        a:1,
        b:0
      }
      else
      return  {
        a:Math.sqrt(array[array.length-1]),
        b:num/array[array.length-1]
      }
    },
        findingGCD(a, b){
            if ( ! b) {
                return a;
                }
            return this.findingGCD(b, a % b);
        },   
        decimalToFraction(decimal){
            for(var i=10; i< Math.pow(10, 7); i=i*10){
                if(this.isWholeNumber(decimal*i)){
                    break;
                }
            }
            let first = decimal*i;
            let second = Math.round(first);
            // finding the gcd of 10 and second
            let gcd = this.findingGCD(i, second);
            let a = second/gcd;
            let b = i/gcd;
            return {
                numerator :  a,
                denominator : b
            }
        },
        isWholeNumber(number){
            return (number - Math.floor(number))==0;
        },
        simplfyFraction(x, y){
            let num = x/y
            let a = x/this.findingGCD(x, y)
            let b = y/this.findingGCD(x, y)
            if(num==0) return '0'
            else if(num<0){
                if(b==-1 || b==1)return -1*Math.abs(a);
                else return '\\frac{-' + Math.abs(Math.abs(a)) + '}{' + Math.abs(b) + '}'
            }
            else if(num>0){
                if(b==1){
                    return a
                }
                else{
                    return '\\frac{' + a + '}{' + b + '}' 
                }
            }
        },
        showNumber(number){
            if(this.decimalVerdict==false){
                let a = this.decimalToFraction(number);
            if(number==0){
                return '0';
            }
            else if(number<0){
                if(a.denominator==-1 || a.denominator==1){
                    return -1*Math.abs(a.numerator);
                }
                else{
                    return '\\frac{-' + Math.abs(Math.abs(a.numerator)) + '}{' + Math.abs(a.denominator) + '}' 
                }
            }
            else if(number>0){
                if(a.denominator==1){
                    return a.numerator;
                }
                else{
                    return '\\frac{' + a.numerator + '}{' + a.denominator + '}' 
                }
            }
            }
            
            else if(this.decimalVerdict==true){
                // number received should maintain the number of decimal it had when accepted
                // instead of values like this: 0.49999999/12.39999999999999
                number = parseFloat(number.toFixed(6));
                return number;
            }
           
        } 
    }
}

export default general;