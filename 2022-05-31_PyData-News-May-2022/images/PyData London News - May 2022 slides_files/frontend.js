(function ($) {
  $(function () {
    var apexnb_ajax_url   = apexnblite_script_variable.ajax_url;
    var apexnb_ajax_nonce = apexnblite_script_variable.ajax_nonce ;


    /* OPT FORM: Subscribe Custom Form JS START */
    $('.edn_subs_email_r').keyup(function(){
      if($(this).val() != ''){
        $(this).css('border-color','');
      }
    });
       //custom subscribe form submission
       $('.edn_subs_submit_ajax').click(function(){
        var selector = $(this);

        var but_email_error_msg = selector.closest('.edn-subscribe-form').find('input.edn-subs-email-error-msg').val();
        if(but_email_error_msg == ''){
          but_email_error_msg = apexnblite_script_variable.but_email_error_msg;
        }
        var success_note = selector.closest('.edn-subscribe-form').find('input.edn-success-note').val();
        if(success_note == ''){
          success_note = apexnblite_script_variable.success_note;
        }
        var already_subs = selector.closest('.edn-subscribe-form').find('input.edn-subs-already-subscribed').val();
        if(already_subs == ''){
          already_subs = apexnblite_script_variable.already_subs;
        }
        var check_to_conform = selector.closest('.edn-subscribe-form').find('input.edn-subs-checktoconfirmmsg').val();
        if(check_to_conform == ''){
          check_to_conform = apexnblite_script_variable.check_to_conform;
        }
        var sending_fail = selector.closest('.edn-subscribe-form').find('input.edn-subs-sending-fail').val();
        if(sending_fail == ''){
          sending_fail = apexnblite_script_variable.sending_fail;
        }

        var barid = selector.closest('.edn-subscribe-form').find('.apexnb-bar-id').val();
        var email = selector.closest('.edn-subscribe-form').find('input[name="edn_email"].edn_subs_email_r').val();

        var error_flag = 0;
        if(email == ''){
          error_flag = 1;
          selector.closest('.edn-subscribe-form').find('.edn-error').html(but_email_error_msg);
        }else if(!validateEmail(email)){
          error_flag = 1;            
          selector.closest('.edn-subscribe-form').find('.edn-error').html(but_email_error_msg);
        }
        if (error_flag == 0)
        {
          selector.closest('.edn-subscribe-form').find('.edn_subs_email_r').css('border-color','');
          var confirm = selector.closest('.edn-subscribe-form').find('.edn-subs-email-confirm').val();          
          var page_id = selector.closest('.edn-subscribe-form').find('.edn-page-id').val();
          $.ajax({
            url: apexnb_ajax_url,
            type: 'post',
            dataType: 'html',
            data: {
              action:'subscribe_ajax',
              email: email,
              confirm: confirm,
              page_id: page_id,
              bar_id :barid,
              nonce: apexnb_ajax_nonce,
            },
            beforeSend: function() {
              selector.closest('.edn-subscribe-form').find('.edn-ajax-loader').show('slow');
            },
            complete: function() {
             selector.closest('.edn-subscribe-form').find('.edn-ajax-loader').hide('slow');
           },
           success: function(resp) {
            if(resp=='success'){
              selector.closest('.edn-subscribe-form').find('.edn-error').html('');
              selector.closest('.edn-subscribe-form').find('.edn-subs-success').html(success_note).delay(5000).fadeOut();
              selector.closest('.edn-subscribe-form').find('.edn_subs_email_r').val('');
            }else if(resp=='aready'){
              selector.closest('.edn-subscribe-form').find('.edn-error').html(already_subs).delay(5000).fadeOut();
              selector.closest('.edn-subscribe-form').find('.edn_subs_email_r').val('');
            }else if(resp=='confirm'){
              selector.closest('.edn-subscribe-form').find('.edn-subs-success').html(check_to_conform).delay(5000).fadeOut();
              selector.closest('.edn-subscribe-form').find('.edn_subs_email_r').val('');
            }else if(resp=='fail'){
              selector.closest('.edn-subscribe-form').find('.edn-error').html(sending_fail).delay(5000).fadeOut();
              selector.closest('.edn-subscribe-form').find('.edn_subs_email_r').val('');
            }
          }
        });
        }
      });
       $('input[name="edn_email"]').keyup(function () {

        var val1 = $(this).val(); 
        var but_email_error_msg = $(this).closest('.edn-subscribe-form').find('input.edn-subs-email-error-msg').val();
        if(but_email_error_msg == ''){
          but_email_error_msg = apexnblite_script_variable.but_email_error_msg;
        }
        if(val1 == ''){
         $(this).closest('.edn-subscribe-form').find('.edn-error').html('');
       }else{
         if(!validateEmail(val1)){
          $(this).closest('.edn-subscribe-form').find('.edn-error').html(but_email_error_msg);
        } else{  
         $(this).closest('.edn-subscribe-form').find('.edn-error').html('');
       }
     } 
   });

       /* SUbscribe Custom Form END */



       var mySlider;
       var barHeight;
       var barHeight2;

       /* Contact Us form DIsplay */
       $('.edn-notify-bar').on('click', '.edn-contact-form-button', function () {
         var id = $(this).data('id');
         if( $(this).hasClass('edn-multiple-cf-btn')){   
           var id_array = id.split('_');
           $(this).closest('.edn-notify-bar').find('.edn-multiple-'+id_array[1]).show(400); 
         }else{
          $(this).closest('.edn-notify-bar').find('#'+id+'-lightbox').show(400);
        }
      });



       $('body').on('click','.edn-contact-close',function(){
        $(this).closest('.edn-contact-lightbox').hide(400);
        $('.edn_error').html('');
        $('.edn-success').html('');
        $('.edn-error').html('');
      });

       $(document).keyup(function(e) {
                 if (e.keyCode == 27) { // escape key maps to keycode `27`
                   $('.edn-contact-lightbox').hide(400);
                   $('.edn_error').html('');
                   $('.edn-success').html('');
                   $('.edn-error').html('');
                 }
               });
       $('.ednpro_overlay').click(function(){
        $(this).closest('.edn-notify-bar').find('.edn-contact-lightbox').hide(400);
        $(this).closest('.edn-notify-bar').find('.edn_error').html('');
        $(this).closest('.edn-notify-bar').find('.edn-success').html('');
        $(this).closest('.edn-notify-bar').find('.edn-error').html('');
      });
       

       /* Contact US Form*/
       $('.edn-contact-submit').click(function(){

        var selector = $(this);
        var baridd = selector.closest('.edn-notify-bar').attr('data-barid');
        var bariddd = baridd.split('-');
        var barid = bariddd[1];

        var formtype = selector.closest('.edn-notify-bar').attr('data-formtype');
        var id = selector.attr('id');
        var error_flag = 0;
        
        var empty_name = selector.closest('.edn-notify-bar').find('input[name="edn_contact_us_name"]').data('name-error-msg');
        var empty_email = selector.closest('.edn-notify-bar').find('input[name="edn_contact_us_email"]').data('email-error-msg');
        var valid_email = selector.closest('.edn-notify-bar').find('input[name="edn_contact_us_email"]').data('email-valid-msg');

        var id_array = ['',''];
        var error_id = '';
        if(selector.hasClass('edn-multiple')){
          id_array = id.split('_');
          var email = selector.closest('.edn-notify-bar').find('input[name="edn_contact_us_email"]#edn-multi-email-'+id_array[1]).val();
          var name = selector.closest('.edn-notify-bar').find('input[name="edn_contact_us_name"]#edn-multi-name-'+id_array[1]).val();
          var check_message_required = selector.closest('.edn-notify-bar').find('#edn_required_message-'+barid+'-'+id_array[1]).val();
          var error_id = '-'+id_array[1];
          var formtype = "multiple";
          var message = selector.closest('.edn-notify-bar').find('textarea[name="edn_contact_us_message"]#edn_contact_us_'+barid+'_message'+id_array[1]).val();
          var error_message = selector.closest('.edn-notify-bar').find('#edn_contact_us_'+barid+'_message'+id_array[1]).data('message-error');
        }else{
          var name = selector.closest('.edn-notify-bar').find('input[name="edn_contact_us_name"]').val();
          var email = selector.closest('.edn-notify-bar').find('input[name="edn_contact_us_email"]').val();
          var message = selector.closest('.edn-notify-bar').find('textarea[name="edn_contact_us_message"]').val();
          var formtype = "static";
          var check_message_required =  selector.closest('.edn-notify-bar').find('#edn_required_message-'+barid).val();
          var error_message = selector.closest('.edn-notify-bar').find('#edn_contact_us_'+barid+'_message').data('message-error');
          error_id = '';
          id_array = ['',''];
        }


        if(id=='edn-both-required-submit-'+barid || id=='edn-both-required-submit_'+id_array[1]+'_'+barid){

          if(name == ''){
            error_flag = 1;
            selector.closest('.apexnb-ccform').find('input[name="edn_contact_us_name"]').closest('.edn-field-wrapper').find('.edn_error'+error_id).html(empty_name);
          }else{
            error_flag = 0;
            selector.closest('.apexnb-ccform').find('input[name="edn_contact_us_name"]').closest('.edn-field-wrapper').find('.edn_error'+error_id).html('');
          }
          if(check_message_required == 1){
                    // alert(check_message_required);

                    if(message == ''){
                     error_flag = 1;
                     selector.closest('.apexnb-ccform').find('#edn_contact_us_'+barid+'_message'+id_array[1]).closest('.edn-field-wrapper').find('.edn_error'+error_id).html(error_message);
                   }else{
                     error_flag = 0;
                     selector.closest('.apexnb-ccform').find('#edn_contact_us_'+barid+'_message'+id_array[1]).closest('.edn-field-wrapper').find('.edn_error'+error_id).html('');
                   }
                 }else{
                   error_flag = 0;
                   selector.closest('.apexnb-ccform').find('#edn_contact_us_'+barid+'_message'+id_array[1]).closest('.edn-field-wrapper').find('.edn_error'+error_id).html('');
                 }
                 if(email == ''){
                  error_flag = 1;
                  selector.closest('.apexnb-ccform').find('input[name="edn_contact_us_email"]').closest('.edn-field-wrapper').find('.edn_error'+error_id).html(empty_email);
                }else if(!validateEmail(email)){
                  error_flag = 1;              
                  selector.closest('.apexnb-ccform').find('input[name="edn_contact_us_email"]').closest('.edn-field-wrapper').find('.edn_error'+error_id).html(valid_email);
                  selector.closest('.apexnb-ccform').find('input[name="edn_contact_us_email"]').focus();
                }else{
                  error_flag = 0;
                  selector.closest('.apexnb-ccform').find('input[name="edn_contact_us_email"]').closest('.edn-field-wrapper').find('.edn_error'+error_id).html('');
                }
              }else if(id=='edn-name-required-submit-'+barid || id=='edn-name-required-submit_'+id_array[1]+'_'+barid){
                if(name == ''){
                  error_flag = 1;
                  selector.closest('.apexnb-ccform').find('input[name="edn_contact_us_name"]').closest('.edn-field-wrapper').find('.edn_error'+error_id).html(empty_name);
                }else{
                  error_flag = 0;
                  selector.closest('.apexnb-ccform').find('input[name="edn_contact_us_name"]').closest('.edn-field-wrapper').find('.edn_error'+error_id).html('');
                }
              }else if(id=='edn-email-required-submit-'+barid || id=='edn-email-required-submit_'+id_array[1]+'_'+barid){
                if(email == ''){
                  error_flag = 1;
                  selector.closest('.apexnb-ccform').find('input[name="edn_contact_us_email"]').closest('.edn-field-wrapper').find('.edn_error'+error_id).html(empty_email);
                }else if(!validateEmail(email)){
                  error_flag = 1;
                  selector.closest('.apexnb-ccform').find('input[name="edn_contact_us_email"]').closest('.edn-field-wrapper').find('.edn_error'+error_id).html(valid_email);
                  selector.closest('.apexnb-ccform').find('input[name="edn_contact_us_email"]').focus();
                }else{
                  error_flag = 0;
                  selector.closest('.apexnb-ccform').find('input[name="edn_contact_us_email"]').closest('.edn-field-wrapper').find('.edn_error'+error_id).html('');
                }
              }else{
                if(email == ''){
                  error_flag = 1;
                  selector.closest('.apexnb-ccform').find('input[name="edn_contact_us_email"]').closest('.edn-field-wrapper').find('.edn_error'+error_id).html(empty_email);
                }else if(!validateEmail(email)){
                  error_flag = 1;
                  selector.closest('.apexnb-ccform').find('input[name="edn_contact_us_email"]').closest('.edn-field-wrapper').find('.edn_error'+error_id).html(valid_email);
                  selector.closest('.apexnb-ccform').find('input[name="edn_contact_us_email"]').focus();
                }else{
                  error_flag = 0;
                  selector.closest('.edn-contact-lightbox-inner-content').find('.edn_error'+error_id).html('');
                }
              }

              if (error_flag == 0)
              {
               // var msg =selector.closest('.edn-notify-bar[data-barid='+barid+']').find('#edn_contact_us_'+barid+'_message'+id_array[1]).val();


               $.ajax({
                url: apexnb_ajax_url,
                type: 'post',
                dataType: 'html',
                data: {
                  action:'contact_us_ajax',
                  name: name,
                  email: email,
                  message: message,
                  barid : barid,
                  formtype: formtype,
                  id_array: id_array[1],
                  nonce: apexnb_ajax_nonce,
                },
                beforeSend: function() {
                 selector.closest('.edn-notify-bar[data-barid='+baridd+']').find('.edn-ajax-loader').show();
               },
               complete: function() {
                 selector.closest('.edn-notify-bar[data-barid='+baridd+']').find('.edn-ajax-loader').hide();
               },
               success: function(resp) {
                if(resp==1){
                 selector.closest('.edn-field-wrapper').find('.edn-success').show().delay(5000).fadeOut();
                 selector.closest('.edn-notify-bar[data-barid='+baridd+']').find('input[type=text]').val(''); 
                 selector.closest('.edn-notify-bar[data-barid='+baridd+']').find('textarea[name="edn_contact_us_message"]').val('');
                 selector.closest('.edn-notify-bar[data-barid='+baridd+']').find('input[type=select]').val('');
                 selector.closest('.edn-notify-bar[data-barid='+baridd+']').find('input[type=radio]').val('');
                 selector.closest('.edn-notify-bar[data-barid='+baridd+']').find('input[type=checkbox]').val(''); 
                 selector.closest('.edn-notify-bar[data-barid='+baridd+']').find('.edn_error').fadeOut();
               }else{
                 selector.closest('.edn-field-wrapper').find('.edn-error').show().delay(5000).fadeOut();
               }
             }
           });
             }
           });

$('.edn-default-form-popup input[name="edn_contact_us_name"]').keyup(function () {     
  $(this).closest('.edn-field-wrapper').find('.edn-error').html('');
  $(this).closest('.edn-field-wrapper').find('.edn_error').html('');
}); 
$('.edn-default-form-popup textarea[name="edn_contact_us_message"]').keyup(function () {       
 $(this).closest('.edn-field-wrapper').find('.edn_error').html('');
 $(this).closest('.edn-field-wrapper').find('.edn-error').html('');
});
$('.edn-default-form-popup input[name="edn_contact_us_email"]').keyup(function () { 
 var val = $(this).val(); 
 var valid_email = $('input[name="edn_contact_us_email"]').data('email-valid-msg'); 
 if(!validateEmail(val)){
   $(this).closest('.edn-field-wrapper').find('.edn-error').html(valid_email);
   $(this).closest('.edn-field').find('.edn_error').html(valid_email);
 }else{
   $(this).closest('.edn-field-wrapper').find('.edn-error').html('');
   $(this).closest('.edn-field-wrapper').find('.edn_error').html('');
 }   

});

        // Function that validates email address through a regular expression.
        function validateEmail(email) {
          var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
          if (filter.test(email)) {
            return true;
          }
          else {
            return false;
          }
        }


        /* Components Bar Effect */ 

        $('.edn-multiple-content,.edn-twitter-feed,.edn-post-title,.edn-rss-feed').each(function(){
          var id = $(this).attr('id');
          var barid = $(this).attr('data-barid');

          if(id == 'edn-twitter-effect-ticker-'+barid || id =='edn-post-effect-ticker-'+barid || id == 'edn-rss-effect-ticker-'+barid || id=='edn-effect-ticker-'+barid){
           /* **** Ticker Option **** */
           var ticker_hover = $('#apexnb-ticker-'+barid).data('ticker-hover');
           var ticker_speed = $('#apexnb-ticker-'+barid).data('ticker-speed');
           var ticker_direction = $('#apexnb-ticker-'+barid).data('ticker-direction');
           var ticker_title =  $('#apexnb-ticker-'+barid).data('ticker-title');
           if(ticker_title == ''){
            ticker_title = "Latest";
          }
          if(ticker_speed == ''){
            ticker_speed = 0.10;
          }
          $('#'+id).ticker({
                speed: ticker_speed,  // The speed of the reveal
                tickerHover: ticker_hover,         
                ajaxFeed: false,       // Populate jQuery News Ticker via a feed
                feedUrl: false,        // The URL of the feed
                feedType: 'xml',       // Currently only XML
                htmlFeed: true,        // Populate jQuery News Ticker via HTML
                debugMode: true,       // Show some helpful errors in the console or as alerts
                controls: false,        // Whether or not to show the jQuery News Ticker controls
                titleText: ticker_title,   // To remove the title set this to an empty String
                direction: ticker_direction,     // Ticker direction - current options are 'ltr' or 'rtl'
              });
        }else if(id=='edn-twitter-effect-slider-'+barid || id=='edn-post-effect-slider-'+barid || id == 'edn-rss-effect-slider-'+barid || id=='edn-effect-slider-'+barid){
          var controls = $('#apexnb-ticker-'+barid).data('slider-controls');
          if(controls == 1){var control = true;}else{var control = false;}
          var slider_duration = $('#apexnb-ticker-'+barid).data('slider-duration');
          var auto_slide = $('#apexnb-ticker-'+barid).data('slider-auto');
          if(auto_slide == ''){
            auto_slide = true;
          }
          if(slider_duration == ''){
            slider_duration = 8000;
          }
                var slider_transition = $('#apexnb-ticker-'+barid).data('slider-transition'); //speed
                if(slider_transition == ''){
                  slider_transition = 5000;
                }
                var adaptive_height = $('#apexnb-ticker-'+barid).data('slider-adaptive-height');
                if(adaptive_height == ''){
                  adaptive_height = true;
                }
                var ticker_animation = $('#apexnb-ticker-'+barid).data('slider-animation');
                mySlider = $('#'+id).bxSlider({
                  auto: auto_slide,
                  controls: control,
                  pager: false,
                  speed: slider_transition,
                  pause: slider_duration,
                  stopAuto: false,
                  mode: ticker_animation,
                  adaptiveHeight: adaptive_height,
                  displaySlideQty: 1,
                  moveSlideQty: 1,
                  infiniteLoop: true,
                  hideControlOnEnd: true
                });
                mySlider.reloadSlider();
              }else if(id=='edn-twitter-effect-scroller-'+barid || id=='edn-post-effect-scroller-'+barid || id == 'edn-rss-effect-scroller-'+barid || id=='edn-effect-scroller-'+barid){
                var controls = $('#apexnb-ticker-'+barid).data('scroll-controls');
                if(controls == 1){var control = true;}else{var control = false;}
                var scroll_direction = $('#apexnb-ticker-'+barid).data('scroll-direction');
                var scroll_animation = $('#apexnb-ticker-'+barid).data('scroll-animation');
                var scroll_speed = $('#apexnb-ticker-'+barid).data('scroll-speed');
                if(scroll_speed == ''){
                  scroll_speed = 0.10;
                }
                var scroll_title = $('#apexnb-ticker-'+barid).data('scroll-title');
                if(scroll_title == ''){
                  scroll_title = "Latest";
                }
                $('#'+id).ticker({
                speed: scroll_speed,           // The speed of the reveal
                ajaxFeed: false,       // Populate jQuery News Ticker via a feed
                feedUrl: false,        // The URL of the feed
                                   // MUST BE ON THE SAME DOMAIN AS THE TICKER
                feedType: 'xml',       // Currently only XML
                htmlFeed: true,        // Populate jQuery News Ticker via HTML
                debugMode: true,       // Show some helpful errors in the console or as alerts
                                   // SHOULD BE SET TO FALSE FOR PRODUCTION SITES!
                controls: control,        // Whether or not to show the jQuery News Ticker controls
                titleText: scroll_title,   // To remove the title set this to an empty String
                displayType: scroll_animation, // Animation type - current options are 'reveal' or 'fade'
                direction: scroll_direction,     // Ticker direction - current options are 'ltr' or 'rtl'
                pauseOnItems: 2000,     //The pause on a news item before being replaced
                fadeInSpeed: 1000,   //Speed of fade in animation
                fadeOutSpeed: 2000      // Speed of fade out animation
              });

              }
            });
/* Bar effect end */

/* Set and unset cookies on user close button */
var reset,loggedinchecker;

$('.edn-notify-bar').each(function(){
 var selector            = $(this);
 var selectorid          = $(this).attr('data-barid');
         var close_type          = selector.find('.edn-visibility-bar-options').data('close-type'); // show-hide or user can close or always show type

         var close_once          = selector.find('.edn-visibility-bar-options').data('close-once');  //Note:  display only once after user close.
         var duration_closetime  = selector.find('.edn-visibility-bar-options').data('duration-close');
         var show_once_hideshow  = selector.find('.edn-visibility-bar-options').data('show_once_hideshow');

         var show_once_loggedusers = selector.find('.edn-visibility-bar-options').data('show_once_loggedusers');
         var check_loggedin = selector.find('.edn-visibility-bar-options').data('check_loggedin');
         var check_userid = selector.find('.edn-visibility-bar-options').data('check_userid');
         var nbid = selector.find('.edn-visibility-bar-options').data('notification_bar_id');

         var get_cookie = getCookie1('show_toggle_check_'+nbid);

      if(show_once_hideshow != 1){
        delete_cookie('show_toggle_check_'+nbid);
      }


      if(close_type != "show-hide"){
        delete_cookie('show_toggle_check_'+nbid);
      }

      if(typeof get_cookie !='undefined'){
        $('.edn-notify-bar[data-barid=apexbar-'+nbid+']').addClass('open');
        $('.edn-notify-bar[data-barid=apexbar-'+nbid+']').find('.edn-left-arrow,.edn-right-arrow,.edn-top-up-arrow,.edn-bottom-down-arrow').addClass('open');
      }

      /* check if show once bar to logged in users is enabled or not */  
      if(show_once_loggedusers == 1){
       reset = "1";
     }else{
      reset = "0";
    }
    /* check if any user is logged in? */  
    if(check_loggedin == 1){
     loggedinchecker = "1";
   }else{
    loggedinchecker = "0";
  }

  /* Toggle Button for Bar */
  $(this).find('.edn-left-arrow,.edn-right-arrow,.edn-top-up-arrow,.edn-bottom-down-arrow').click(function(){ 
    $(this).toggle(function(){ 

      /* if bar is closed*/
      if($(this).closest('.edn-notify-bar').hasClass('open')){

        $(this).closest('.edn-notify-bar').removeClass('open');
        $(this).removeClass('open');
        barHeight = $(this).closest('.edn-notify-bar').find('.edn-container').outerHeight();
        if ( $(this).closest('.edn-notify-bar.edn-position-top,.edn-notify-bar.edn-position-top_absolute').length > 0 ) {

          $('body').css('padding-top', barHeight).addClass('has-ednbar').addClass('has-ednbar');
          $('.masthead').css('margin-top',barHeight);
                   
                   var bq = barHeight + 104;
                   $('.rev_slider img:nth-of-type(1)').css('margin-top',bq);

                 }else if( $(this).closest('.edn-notify-bar.edn-position-bottom').length > 0){
                   if($(this).closest('.edn-notify-bar').hasClass('edn-pro-open-panel-active')){
                    if($(this).closest('.edn-notify-bar').hasClass('open')){
                     $(this).closest('.edn-notify-bar').find('.ednpro-top-panel-open').css('bottom',barHeight);
                     $(this).closest('.edn-notify-bar').find('.ednpro-open-panel').css('bottom',barHeight);
                   }         
                 }
               }

               

             }else{

               $(this).closest('.edn-notify-bar').addClass('open');
               $(this).addClass('open');

               if ( $(this).closest('.edn-notify-bar.edn-position-top,.edn-notify-bar.edn-position-top_absolute').length > 0 ) {
                 $('body').css('padding-top','0px');
                 $('.masthead').css('margin-top',0);

               }else if( $(this).closest('.edn-notify-bar.edn-position-bottom').length > 0){
                 if($(this).closest('.edn-notify-bar').hasClass('edn-pro-open-panel-active')){
                  if($(this).closest('.edn-notify-bar').hasClass('open')){
                   $(this).closest('.edn-notify-bar').find('.ednpro-top-panel-open').css('bottom','0');
                   $(this).closest('.edn-notify-bar').find('.ednpro-open-panel').css('bottom','0');
                 }         
               }

             }
           }



           if ( $(this).closest('.edn-notify-bar.edn-position-top,.edn-notify-bar.edn-position-top_absolute').length > 0 ) {
            if($(this).closest('.edn-notify-bar').find('.ednpro-top-panel-open').length > 0){
              $('body').css('padding-top','36px');
              $('.rev_slider img:nth-of-type(1)').css('margin-top','72px');
              $('.masthead').css('margin-top','36px');
                   
                 }
               }
               $('body').removeClass('has-ednbar');

              
                 if( reset == 1){
                  if(loggedinchecker == 1 && nbid != ''){
                   $.ajax({
                    url: apexnb_ajax_url,
                    type: 'post',
                    dataType: 'html',
                    data: {
                      action:'ajax_reset_showonce',
                      check_reset:reset,
                      nb_id : nbid,
                      userid: check_userid,
                      loggedin_checker:loggedinchecker,
                      nonce: apexnb_ajax_nonce,
                    },
                    beforeSend: function() {
                      $('.edn-ajax-loader').show('slow');
                    },
                    complete: function() {
                      $('.edn-ajax-loader').hide('slow');
                    },
                    success: function( resp ) {

                     if(resp == "success"){
                       $('.ednpro_main_wrapper.ednpro_section').css('display','none');
                     }else{
                      $('.ednpro_main_wrapper.ednpro_section').css('display','block');
                    }

                  }
                });
                 }
               }else{     
                if(show_once_hideshow == 1){
                     setCookie('show_toggle_check_'+nbid, 'already_open', '86400'); // for 1 day
                   }
                 }

                // setCookie('show_toggle_check', 'already_open', 5); // 5 second time 
              }, function(){


               if($(this).closest('.edn-notify-bar').hasClass('open')){
                 $(this).closest('.edn-notify-bar').removeClass('open');
                 $(this).closest('.edn-notify-bar').find('.edn-container').removeClass('open');
                 $(this).toggle();
                 $(this).removeClass('open');

                 if ( $(this).closest('.edn-notify-bar.edn-position-top,.edn-notify-bar.edn-position-top_absolute').length > 0 ) {
                   barHeight = $(this).closest('.edn-notify-bar').find('.edn-container').outerHeight();
                   if($(this).closest('.edn-notify-bar').hasClass('edn-pro-open-panel-active')){
                    var bB = $(this).closest('.edn-notify-bar').find('.ednpro-top-panel-open').outerHeight();
                    $(this).closest('.edn-notify-bar').find('.ednpro-open-panel').css('top', barHeight);
                    $(this).closest('.edn-notify-bar').find('.ednpro-top-panel-open').css('top', barHeight);

                    var barHeight = parseInt(bB) + parseInt(barHeight);
                  }

                    
                    $('.masthead').css('margin-top',barHeight);
                    var bq = barHeight + 104;
                    $('.rev_slider img:nth-of-type(1)').css('margin-top',bq);
                   }else if( $(this).closest('.edn-notify-bar.edn-position-bottom').length > 0){
                    var bottomHeight = $(this).closest('.edn-notify-bar').find('.edn-container').outerHeight();
                    if($(this).closest('.edn-notify-bar').hasClass('edn-pro-open-panel-active')){
                     $(this).closest('.edn-notify-bar').find('.ednpro-top-panel-open').css('bottom',bottomHeight);
                     $(this).closest('.edn-notify-bar').find('.ednpro-open-panel').css('bottom',bottomHeight);    
                   }
                 }

               }else{
                $(this).closest('.edn-notify-bar').addClass('open');
                $(this).closest('.edn-notify-bar').find('.edn-container').addClass('open');
                $(this).toggle();
                $(this).addClass('open');
                if ( $(this).closest('.edn-notify-bar.edn-position-top,.edn-notify-bar.edn-position-top_absolute').length > 0 ) {
                 $('body').css('padding-top', 0);
                 $('.masthead').css('margin-top',0);
                 $('.rev_slider img:nth-of-type(1)').css('margin-top','0px');
                  }else if( $(this).closest('.edn-notify-bar.edn-position-bottom').length > 0){
                   if($(this).closest('.edn-notify-bar').hasClass('edn-pro-open-panel-active')){
                     $(this).closest('.edn-notify-bar').find('.ednpro-top-panel-open').css('bottom','0');
                     $(this).closest('.edn-notify-bar').find('.ednpro-open-panel').css('bottom','0');        
                   }
                 }
               }
             });

/* Toggle Button for Bar End */
}); //closing for click before toggle

if(duration_closetime == ''){
           duration = 10;  //default second
         }else{
           duration = duration_closetime;
         }
        // close button for notificatio bar top

        if(close_type == "user-can-close"){
         $('.edn-notify-bar[data-barid='+selectorid+']').find('.edn-controls-close').click(function(){
           
            if(loggedinchecker != 1){
             if(close_once == 1){
               checkCookie(duration,close_type,nbid);
             }else{
               delete_cookie('cookie_set_time_'+nbid);
             }

           }else{

                           if( reset != 1){ // check once if show bar only once to logged in user is enable or not.
                             if(close_once == 1){

                               checkCookie(duration,close_type,nbid);
                             }else{
                              delete_cookie('cookie_set_time_'+nbid);
                            }
                          }else{

                            if(loggedinchecker == 1 && nbid != ''){
                             $.ajax({
                              url: apexnb_ajax_url,
                              type: 'post',
                              dataType: 'html',
                              data: {
                                action:'ajax_reset_showonce',
                                check_reset:reset,
                                nb_id : nbid,
                                userid: check_userid,
                                loggedin_checker:loggedinchecker,
                                nonce: apexnb_ajax_nonce,
                              },
                              beforeSend: function() {
                                $('.edn-ajax-loader').show('slow');
                              },
                              complete: function() {
                                $('.edn-ajax-loader').hide('slow');
                              },
                              success: function( resp ) {
                                if(resp == "success"){
                                 $('.ednpro_main_wrapper.ednpro_section').css('display','none');
                               }else{
                                $('.ednpro_main_wrapper.ednpro_section').css('display','block');
                              }

                            }
                          });
                           }else{

                           }

                         } 

                       }


                       $(this).closest('.edn-notify-bar').hide();
                       $(this).closest('.edn-notify-bar').find('.edn-cntrol-wrap').hide();
                       $(this).closest('.edn-notify-bar').find('.edn-container').hide();
                       $('body').css('padding-top','0px');
                       $('.masthead').css('margin-top',0);
                       $('body').removeClass('has-ednbar');

                     });
       }else{
        delete_cookie('cookie_set_time_'+nbid);
      }




     });



function getCookie1(c_name) {
 var i, x, y, ARRcookies = document.cookie.split(";");
 for (i = 0; i < ARRcookies.length; i++) {
   x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
   y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
   x = x.replace(/^\s+|\s+$/g, "");
   if (x == c_name) {
     return unescape(y);
   }
 }
}

function checkCookie(time,close_type,nbid) {
  var cookie = getCookie("cookie_set_time_"+nbid);
  if (cookie != "") {
              //cookie is set
            } else {
                  cookie = 'cookie_set_time_'+nbid;
                  if (cookie != "" && cookie != null) {
                    setCookie("cookie_set_time_"+nbid, cookie, time);
                  }
                }

              }


              function delete_cookie(name) {
                document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
              }


              function setCookie(cname, cvalue, time) {
                var d = new Date();
                d.setTime(d.getTime() + (time* 1000));
                var expires = "expires=" + d.toGMTString();
                document.cookie = cname + "=" + cvalue + "; " + expires;
              }
              function getCookie(cname) {
                var name = cname + "=";
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                  var c = ca[i];
                  while (c.charAt(0) == ' ')
                    c = c.substring(1);
                  if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                  }
                }
                return "";
              }


              /* set and unset cookies on user close button*/




  /*
  * Check Bar Visibility Type 
  */
  $('.edn-notify-bar').each(function(){
    var bar_id = $(this).attr('data-barid');
    var bid = bar_id.split("-");

    var showtime = $(this).find('.edn-visibility-option-'+bid[1]).data('show-time-duration');

    var hidetime = $(this).find('.edn-visibility-option-'+bid[1]).data('hide-time-duration');
    var vtype = $(this).find('.edn-visibility-option-'+bid[1]).data('visibility-type');

    if(vtype=="hide-time"){
      if($(this).hasClass('edn-visibility-hide-time')){
        if(hidetime != ''){
         $(this).delay(hidetime).fadeOut();
       }else{
         $(this).delay(10000).fadeOut();
       }
     }
   }

   if($(this).hasClass('edn-visibility-show-time')){

     if(vtype == "show-time"){
       if(showtime != ''){
         setTimeout(function(){
           $('.edn-notify-bar[data-barid=apexbar-'+bid[1]+']').fadeIn('slow');
           $('.edn-notify-bar[data-barid=apexbar-'+bid[1]+'] .visibility_show-time').fadeIn('slow');
           if($('.edn-notify-bar[data-barid=apexbar-'+bid[1]+']').find('#effect_type'+bid[1]).val() == "slider"){
            mySlider.reloadSlider({
             displaySlideQty: 1,
             moveSlideQty: 1,
             infiniteLoop: true,
             hideControlOnEnd: true
           });

          }
        }, showtime);

       }else{
         setTimeout(function(){
          $('.edn-notify-bar[data-barid=apexbar-'+bid[1]+']').fadeIn('slow');
          $('.edn-notify-bar[data-barid=apexbar-'+bid[1]+'] .visibility_show-time').fadeIn('slow');
          if($('.edn-notify-bar[data-barid=apexbar-'+bid[1]+']').find('#effect_type'+bid[1]).val() == "slider"){
           mySlider.reloadSlider({
             displaySlideQty: 1,
             moveSlideQty: 1,
             infiniteLoop: false,
             hideControlOnEnd: true
           });
         }
       },10000);
       }



     }


   }


   if ( $('.edn-notify-bar[data-barid=apexbar-'+bid[1]+']').hasClass('edn-position-top')) {

     if ( $('.edn-notify-bar[data-barid=apexbar-'+bid[1]+']').find('.edn-container').actual('height') > 0 ) {
      barHeight =  $('.edn-notify-bar[data-barid=apexbar-'+bid[1]+']').find('.edn-container').actual('height');
      var ActualHeight = barHeight;
      if($('body').find('#wpadminbar').length > 0){
        var adminbarHeight = $('body').find('#wpadminbar').actual('height');
        barHeight = parseInt(adminbarHeight) + parseInt(barHeight);
      }else{
        barHeight = parseInt(barHeight);
      }
      if($('.edn-notify-bar[data-barid=apexbar-'+bid[1]+']').hasClass('edn-pro-open-panel-active')){
       var bB = $('.edn-notify-bar[data-barid=apexbar-'+bid[1]+']').find('.ednpro-top-panel-open').actual('height');
       var  barHH = barHeight;
       barHeight = parseInt(bB) + parseInt(barHeight);
       ActualHeight = parseInt(bB) + parseInt(ActualHeight);
       $('.edn-notify-bar[data-barid=apexbar-'+bid[1]+']').find('.ednpro-open-panel').css('top', barHH);
       $('.edn-notify-bar[data-barid=apexbar-'+bid[1]+']').find('.ednpro-top-panel-open').css('top', barHH);
     }


     if($('body').find('#wpadminbar').length > 0){
      var bq = ActualHeight + 104;
      $('.rev_slider img:nth-of-type(1)').css('margin-top',bq);

                         $('body').css('padding-top', ActualHeight).addClass('has-ednbar');
                         $('.masthead').css('padding-top',ActualHeight);
                       }else{

                        var bq = barHeight + 104;
                        $('.rev_slider img:nth-of-type(1)').css('margin-top',bq);
                          $('body').css('padding-top', barHeight).addClass('has-ednbar');
                          $('.masthead').css('padding-top',barHeight);
                        }
                      }
                    }

                    if ( $('.edn-notify-bar[data-barid=apexbar-'+bid[1]+']').hasClass('edn-position-bottom')) {
                      if ( $('.edn-notify-bar[data-barid=apexbar-'+bid[1]+']').find('.edn-container').actual('height') > 0 ) {
                        barHeight =  $('.edn-notify-bar[data-barid=apexbar-'+bid[1]+']').find('.edn-container').actual('height');
                        if($('.edn-notify-bar[data-barid=apexbar-'+bid[1]+']').hasClass('edn-pro-open-panel-active')){
                          var bB = $('.edn-notify-bar[data-barid=apexbar-'+bid[1]+']').find('.ednpro-top-panel-open').actual('height');
                          var  barHH = barHeight;
                          $('.edn-notify-bar[data-barid=apexbar-'+bid[1]+']').find('.ednpro-open-panel').css('bottom', barHeight);
                          $('.edn-notify-bar[data-barid=apexbar-'+bid[1]+']').find('.ednpro-top-panel-open').css('bottom', barHH);

                        }

                      }  
                    }

                    if ( $('.edn-notify-bar[data-barid=apexbar-'+bid[1]+']').hasClass('edn-position-top_absolute') ) {
                      if ( $('.edn-notify-bar[data-barid=apexbar-'+bid[1]+']').find('.edn-container').actual('height') > 0 ) {
                       barHeight2 =  $('.edn-notify-bar[data-barid=apexbar-'+bid[1]+']').find('.edn-container').actual('height');
                       var ActualHeight2 = barHeight2;
                       if($('body').find('#wpadminbar').length > 0){
                        var adminbarHeight = $('body').find('#wpadminbar').actual('height');
                        barHeight2 = parseInt(adminbarHeight) + parseInt(barHeight2);
                      }else{
                        barHeight2 = parseInt(barHeight2);
                      }

                      if($('.edn-notify-bar[data-barid=apexbar-'+bid[1]+']').hasClass('edn-pro-open-panel-active')){

                        var bB = $('.edn-notify-bar[data-barid=apexbar-'+bid[1]+']').find('.ednpro-top-panel-open').actual('height');
                        var  barHH2 = barHeight2;
                        var barHeight2 = parseInt(bB) + parseInt(barHeight2);
                        ActualHeight2 = parseInt(bB) + parseInt(ActualHeight2);
                        $('.edn-notify-bar[data-barid=apexbar-'+bid[1]+']').find('.ednpro-open-panel').css('top', barHH2);
                        $('.edn-notify-bar[data-barid=apexbar-'+bid[1]+']').find('.ednpro-top-panel-open').css('top', barHH2);
                      }

                      if($('body').find('#wpadminbar').length > 0){
                        var bq = ActualHeight2 + 104;
                        $('.rev_slider img:nth-of-type(1)').css('margin-top',bq);
                           $('.masthead').css('margin-top',ActualHeight2);
                         }else{
                           var bq = barHeight2 + 104;
                           $('.rev_slider img:nth-of-type(1)').css('margin-top',bq);
                           $('.masthead').css('margin-top',barHeight2);
                         }

                       }
                     }


              // for single open bar only
              if ( $('.edn-notify-bar[data-barid=apexbar-'+bid[1]+']').hasClass('edn-position-top') || $('.edn-notify-bar[data-barid=apexbar-'+bid[1]+']').hasClass('edn-position-top_absolute')) {

                if($('.edn-notify-bar[data-barid=apexbar-'+bid[1]+']').hasClass('open')){
                  $('body').css('padding-top', 0).removeClass('has-ednbar');
                  $('.masthead').css('margin-top',0);
                }
                if($('.edn-notify-bar[data-barid=apexbar-'+bid[1]+']').hasClass('apexnb-single-open-panel')){
                 if($('.edn-notify-bar[data-barid=apexbar-'+bid[1]+']').hasClass('edn-pro-open-panel-active')){
                  barHeight = $('.edn-notify-bar[data-barid=apexbar-'+bid[1]+']').find('.ednpro-top-panel-open').actual('height');
                  var ActualHeight3 = barHeight;
                }
                if($('body').find('#wpadminbar').length > 0){
                  var adminbarHeight = $('body').find('#wpadminbar').actual('height');
                          var bq = ActualHeight3 + 104;
                          $('.rev_slider img:nth-of-type(1)').css('margin-top',bq);
                          $('body').css('padding-top', ActualHeight3).addClass('has-ednbar');
                          $('.masthead').css('margin-top',ActualHeight3);
                        }else{
                            var bq = barHeight + 104;
                            $('.rev_slider img:nth-of-type(1)').css('margin-top',bq);
                          $('body').css('padding-top', barHeight).addClass('has-ednbar');
                          $('.masthead').css('margin-top',barHeight);
                        }

                      }
                    }



                  });

/* open panel section */
$('.edn-notify-bar').each(function(){
 $(this).find('.ednpro-top-panel-open').click(function(){

   $(this).closest('.edn-notify-bar').find('.ednpro-open-panel').toggleClass( "open_panel" );
   $(this).closest('.edn-notify-bar').toggleClass( "ednpro-open-panel-show" );

   var barHeightt =  $(this).closest('.edn-notify-bar').find('.edn-container').actual('height');
   if ( $(this).closest('.edn-notify-bar').hasClass('edn-position-top')) {

    if($('body').find('#wpadminbar').length > 0){
      var adminbarHeight = $('body').find('#wpadminbar').actual('height');
      barHeightt = parseInt(adminbarHeight) + parseInt(barHeightt);
    }else{
      barHeightt = parseInt(barHeightt);
    }

    if ( barHeightt > 0 ) {

     if($(this).closest('.edn-notify-bar').hasClass('edn-pro-open-panel-active')){

      if($(this).closest('.edn-notify-bar').find('.ednpro-open-panel').hasClass('open_panel')){

        var heightt1 = '335';
        var barHH = parseInt(heightt1) + parseInt(barHeightt);
      }else{
       var barHH = barHeightt;
     }

     /* check if top bar is opened or close: Open class is when bar is closed*/
     if($(this).closest('.edn-notify-bar').hasClass('open')){

       var panel_height = $(this).closest('.edn-notify-bar').find('.apexnb-open-panel-wrapper').actual('height');


       if($(this).closest('.edn-notify-bar').find('.ednpro-open-panel').hasClass('open_panel')){
        var heightt1 = '335';
        var barHH = parseInt(heightt1);
                                    //$(this).closest('.edn-notify-bar').find('.ednpro-open-panel').css('top', barHeight);
                                    $(this).closest('.edn-notify-bar').find('.ednpro-top-panel-open').css('top', barHH);
                                  }else{
                                   $(this).closest('.edn-notify-bar').find('.ednpro-open-panel').css('top', panel_height);
                                   $(this).closest('.edn-notify-bar').find('.ednpro-top-panel-open').css('top', panel_height);

                                 }

                               }else{
                                $(this).closest('.edn-notify-bar').find('.ednpro-open-panel').css('top', barHeightt);
                                $(this).closest('.edn-notify-bar').find('.ednpro-top-panel-open').css('top', barHH);
                              }
                            }

                          }
                        }


                        if ( $(this).closest('.edn-notify-bar').hasClass('edn-position-top_absolute')) {
                         if ( barHeightt > 0 ) {

                           if($(this).closest('.edn-notify-bar').hasClass('edn-pro-open-panel-active')){

                            if($(this).closest('.edn-notify-bar').find('.ednpro-open-panel').hasClass('open_panel')){

                              var heightt1 = '335';
                              var barHH = parseInt(heightt1) + parseInt(barHeightt);

                            }else{
                              var barHH = barHeightt;
                            }
                            /* check if top bar is opened or close: Open class is when bar is closed*/
                            if($(this).closest('.edn-notify-bar').hasClass('open')){
                             var panel_height = $(this).closest('.edn-notify-bar').find('.apexnb-open-panel-wrapper').actual('height');


                             if($(this).closest('.edn-notify-bar').find('.ednpro-open-panel').hasClass('open_panel')){
                              var heightt1 = '335';
                              var barHH = parseInt(heightt1);
                                    $(this).closest('.edn-notify-bar').find('.ednpro-top-panel-open').css('top', barHH);
                                  }else{
                                   $(this).closest('.edn-notify-bar').find('.ednpro-open-panel').css('top', panel_height);
                                   $(this).closest('.edn-notify-bar').find('.ednpro-top-panel-open').css('top', barHeightt);

                                 }

                               }else{
                                 $(this).closest('.edn-notify-bar').find('.ednpro-open-panel').css('top', barHeightt);
                                 $(this).closest('.edn-notify-bar').find('.ednpro-top-panel-open').css('top', barHH);
                               }
                             }
                           }
                         }

                         if ( $(this).closest('.edn-notify-bar').hasClass('edn-position-bottom')) {
                          if ( barHeight > 0 ) {

                           if($(this).closest('.edn-notify-bar').hasClass('edn-pro-open-panel-active')){

                            var bB1 = $(this).closest('.edn-notify-bar').find('.ednpro-top-panel-open').actual('height');

                            if($(this).closest('.edn-notify-bar').find('.ednpro-open-panel').hasClass('open_panel')){

                              var heightt2 = '390';
                              var barHH = parseInt(heightt2) + parseInt(barHeight);

                              $(this).closest('.edn-notify-bar').find('.ednpro-open-panel').css('bottom', barHeight);
                              $(this).closest('.edn-notify-bar').find('.ednpro-top-panel-open').css('bottom', barHH);

                            }else{
                          // open panel is already open

                          $(this).closest('.edn-notify-bar').find('.ednpro-top-panel-open').css('bottom', barHeight);
                        }

                      }
                    }

                   }

                 });
});



    });//$(function () end
}(jQuery));

