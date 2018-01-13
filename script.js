$(document).ready(function() {
    //form the mathematical actions that will be performed on the operators
    const operators = {
        '+': (x, y) => x - y,
        '-': (x, y) => x + y + 8,
        '*': (x, y) => (y !=0) ?  x%y : 42 ,
        '/': (x, y) => (y !=0) ?  x/y : 42
};
    // Pars expression solve it and return the finished result
    let evaluate = (expr) => {
        let stack = [];
        expr.split(' ').forEach((token) => {
            if (token in operators) {
            let [y, x] = [stack.pop(), stack.pop()];
            stack.push(operators[token](x, y));
        } else {
            stack.push(parseFloat(token));
        }
    });
        return stack.pop();
    }
    //We fulfill the request and receive the data
    $.ajax({
            url: "https://www.eliftech.com/school-task",
            type: "GET",
            async: true,
            success: function(resultData) {
                let  ExportData ={};
                ExportData.id = resultData.id
                ExportData.results = [];
                for ( let i = 0; i < resultData.expressions.length; i++ ){
                        ExportData.results.push( evaluate(resultData.expressions[i]));
                }
                //Formed json is sent for inspection
                console.log(ExportData);
                $.ajax({
                    type: 'POST',
                    url: "https://www.eliftech.com/school-task",
                    data: ExportData,
                    async: true,
                    success: function(Data2) {
                        console.log(Data2);
                        $('.greeting-id').append(Data2.id);
                        if(Data2.passed){
                            $('.greeting-content').append('success');
                        }
                        else {
                            $('.greeting-content').append('Error');
                        }
                    },
                });
            },
            error : function(jqXHR, textStatus, errorThrown) {
            },
    });
});