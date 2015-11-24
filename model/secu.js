
exports.sqlprotect = function (text) {
    
    text = text.split('');
    
   
    for (var i in text) {
        
        if ((text[i] == ' ') || (text[i] == '"') || (text[i] == "'") || (text[i] == "=") || (text[i] == "-")){
            return 1;
        }
    }

}