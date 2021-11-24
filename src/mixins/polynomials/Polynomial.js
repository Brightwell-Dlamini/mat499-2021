const poly={
    data(){
        return{

        }
    },
    methods:{
        polyDerivatives(a, b, c, d, e, f){
            let array = [a, b, c, d, e, f]
            let ans = []
            ans[0] = 0
            for(let i=5; i>0; i--){
              ans.push(array[5-i]*i)
            }
            return this.showPolynomial(...ans)
          },
        showPolynomial(a, b, c, d, e, f){
            let array = [a, b, c, d, e]
            let demo = ''
            for(let i=0; i<5; i++){
                if(array[i]==0) demo = demo +  ''
                else if(array[i]>0){
                    if(array[i]==1) demo = demo + '+x^{' + (5-i) + '}'
                    else demo = demo +  '+' + array[i] + 'x^{' + (5-i) + '}';
                }
                else if(array[i]<0){
                    if(array[i]==-1)demo = demo + '-x^{' + (5-i) + '}'
                    else demo = demo +  '-' + (-1*array[i]) + 'x^{' + (5-i) + '}'
                }
            }

            // now we have achieved something like this <-----> +5x^5-3x^2+x^3-2x^2+3x^1
            // removing the 1 now
            if(demo[demo.length-2]==1) demo = demo.substring(0, (demo.length-4))

            // Since now we have cases like +5x^5-3x^2+x^3-2x^2+3x
            if(demo[0]==String.fromCharCode(43)) demo = demo.substring(1)

            // Since now we have cases like 5x^5-3x^2+x^3-2x^2+3x
            // we have to add the constant 
            if(f>0){
                if(a==0&&b==0&&c==0&&d==0&&e==0){
                    demo = demo + f
                }
                else demo = demo + '+' + f
            }
            else if(f<0) demo = demo + '-' + (-1*f)
            
            return demo
        },
        substitutePolynomial(a, b, c, d, e, f, value){
            let array = [a, b, c, d, e]
            let demo = 0
            for(let i=0; i<5; i++){
                demo = demo + array[i]*Math.pow(value, 5-i)
            }
            demo = demo + f
            return demo
        },
        calculatePowers(a, b, c, d, e, f, value){
            let array = [a, b, c, d, e]
            let demo = ''
            for(let i=0; i<5; i++){
                if(array[i]==0) demo = demo +  ''
                else if(array[i]>0){
                    if(array[i]==1) demo = demo + '+(' + Math.pow(value, (5-i)) + ')'
                    else demo = demo +  '+' + array[i] + '(' + Math.pow(value, (5-i)) + ')'
                }
                else if(array[i]<0){
                    if(array[i]==-1)demo = demo + '-(' + Math.pow(value, (5-i)) + ')'
                    else demo = demo +  '-' + (-1*array[i]) + '(' + Math.pow(value, (5-i)) + ')'
                }
            }

            // now we have achieved something like this <-----> +5x^5-3x^2+x^3-2x^2+3x^1
            // removing the 1 now
            // if(demo[demo.length-2]==1) demo = demo.substring(0, (demo.length-4))

            // Since now we have cases like +5x^5-3x^2+x^3-2x^2+3x
            if(demo[0]==String.fromCharCode(43)) demo = demo.substring(1)

            // Since now we have cases like 5x^5-3x^2+x^3-2x^2+3x
            // we have to add the constant 
            if(f>0){
                if(a==0&&b==0&&c==0&&d==0&&e==0){
                    demo = demo + f
                }
                else demo = demo + '+' + f
            }
            else if(f<0) demo = demo + '-' + (-1*f)
            
            return demo
        },
    }
}

export default poly