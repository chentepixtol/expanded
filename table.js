
(function($){

    $.fn.expanded = function(defaults){
    
        opc = $.extend($.fn.expanded.defaults, defaults);
        
        return this.each(function(){
        
            $(this).click(function(){
            
                var dir = $(this).attr('href');
                var parentTR = $(this).parents('tr').eq(0);
                if ($(this).data('isLoad')) {
                    var elements = $(parentTR).data('elements');
                    $.each(elements, function(numElement, element){
                        $(element).toggleClass('hidden');
                    });
                }
                else {
                    $.fn.expanded.load(parentTR, dir);
                    $(this).data('isLoad', true);
                }
                
                return false;
            });
            
        });
        
    };
    
    $.fn.expanded.defaults = {
        type: 'html'
    };
    
    $.fn.expanded.load = function(parentTR, dir){
        elementsTr = [];
        
        if ($.fn.expanded.defaults.type == 'html') {
            $.ajax({
                url: dir,
                success: function(html){
                    elementsTr = $(html).filter('tr');
                    for (i = elementsTr.length; i >= 0; i--) {
                        $(elementsTr).eq(i).insertAfter(parentTR);
                    }
                    $(parentTR).data('elements', elementsTr);
                }
            });
            
        }
        if ($.fn.expanded.defaults.type == 'json') {
            $.getJSON(dir, function(rows){
            
                $.each(rows, function(numRow, row){
                
                    var newTR = $('<tr></tr>');
                    
                    $.each(row, function(numCell, cell){
                        $(newTR).append('<td>' + cell + '</td>')
                    });
                    
                    elementsTr.push(newTR);
                    
                });
                
                $.each(elementsTr, function(numTr, elementTr){
                    $(elementTr).insertAfter(parentTR);
                });
                
                $(parentTR).data('elements', elementsTr);
                
            });
        }
    }
    
})(jQuery);


$(document).ready(function(){

    $('.toggle').expanded();
    
});
