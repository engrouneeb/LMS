export const EmptyHTML = () => {
  return `<!DOCTYPE html><html lang="en"><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body><div></div></body></html>`;
};
export const RemoveHTML = (data: string) => {
  if (data == null) return '';
  var html = data
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&iexcl;/g, '¡')
    .replace(/&cent;/g, '¢')
    .replace(/&pound;/g, '£')
    .replace(/&curren;/g, '¤')
    .replace(/&yen;/g, '¥')
    .replace(/&brvbar;/g, '¦')
    .replace(/&sect;/g, '§')
    .replace(/&uml;/g, '¨')
    .replace(/&copy;/g, '©')
    .replace(/&ordf;/g, 'ª')
    .replace(/&laquo;/g, '«')
    .replace(/&not;/g, '¬')
    .replace(/&reg;/g, '®')
    .replace(/&macr;/g, '¯')
    .replace(/&deg;/g, '°')
    .replace(/&plusmn;/g, '±')
    .replace(/&sup2;/g, '²')
    .replace(/&sup3;/g, '³')
    .replace(/&acute;/g, '´')
    .replace(/&micro;/g, 'µ')
    .replace(/&para;/g, '¶')
    .replace(/&middot;/g, '·')
    .replace(/&cedil;/g, '¸')
    .replace(/&sup1;/g, '¹')
    .replace(/&ordm;/g, 'º')
    .replace(/&raquo;/g, '»')
    .replace(/&frac14;/g, '¼')
    .replace(/&frac12;/g, '½')
    .replace(/&frac34;/g, '¾')
    .replace(/&iquest;/g, '¿')
    .replace(/&Agrave;/g, 'À')
    .replace(/&Aacute;/g, 'Á')
    .replace(/&Acirc;/g, 'Â')
    .replace(/&Atilde;/g, 'Ã')
    .replace(/&Auml;/g, 'Ä')
    .replace(/&Aring;/g, 'Å')
    .replace(/&AElig;/g, 'Æ')
    .replace(/&Ccedil;/g, 'Ç')
    .replace(/&Egrave;/g, 'È')
    .replace(/&Eacute;/g, 'É')
    .replace(/&Ecirc;/g, 'Ê')
    .replace(/&Euml;/g, 'Ë')
    .replace(/&Igrave;/g, 'Ì')
    .replace(/&Iacute;/g, 'Í')
    .replace(/&Icirc;/g, 'Î')
    .replace(/&Iuml;/g, 'Ï')
    .replace(/&ETH;/g, 'Ð')
    .replace(/&Ntilde;/g, 'Ñ')
    .replace(/&Ograve;/g, 'Ò')
    .replace(/&Oacute;/g, 'Ó')
    .replace(/&Ocirc;/g, 'Ô')
    .replace(/&Otilde;/g, 'Õ')
    .replace(/&Ouml;/g, 'Ö')
    .replace(/&times;/g, '×')
    .replace(/&Oslash;/g, 'Ø')
    .replace(/&Ugrave;/g, 'Ù')
    .replace(/&Uacute;/g, 'Ú')
    .replace(/&Ucirc;/g, 'Û')
    .replace(/&Uuml;/g, 'Ü')
    .replace(/&Yacute;/g, 'Ý')
    .replace(/&THORN;/g, 'Þ')
    .replace(/&szlig;/g, 'ß')
    .replace(/&agrave;/g, 'à')
    .replace(/&aacute;/g, 'á')
    .replace(/&acirc;/g, 'â')
    .replace(/&atilde;/g, 'ã')
    .replace(/&auml;/g, 'ä')
    .replace(/&aring;/g, 'å')
    .replace(/&aelig;/g, 'æ')
    .replace(/&ccedil;/g, 'ç')
    .replace(/&egrave;/g, 'è')
    .replace(/&eacute;/g, 'é')
    .replace(/&ecirc;/g, 'ê')
    .replace(/&euml;/g, 'ë')
    .replace(/&igrave;/g, 'ì')
    .replace(/&iacute;/g, 'í')
    .replace(/&icirc;/g, 'î')
    .replace(/&iuml;/g, 'ï')
    .replace(/&eth;/g, 'ð')
    .replace(/&ntilde;/g, 'ñ')
    .replace(/&ograve;/g, 'ò')
    .replace(/&oacute;/g, 'ó')
    .replace(/&ocirc;/g, 'ô')
    .replace(/&otilde;/g, 'õ')
    .replace(/&ouml;/g, 'ö')
    .replace(/&divide;/g, '÷')
    .replace(/&oslash;/g, 'ø')
    .replace(/&ugrave;/g, 'ù')
    .replace(/&uacute;/g, 'ú')
    .replace(/&ucirc;/g, 'û')
    .replace(/&uuml;/g, 'ü')
    .replace(/&yacute;/g, 'ý')
    .replace(/&thorn;/g, 'þ')
    .replace(/&yuml;/g, 'ÿ');
    // Add more replacements as needed
    return html.replace(/<\/?[^>]+(>|$)/g, '');
};

export const EmbedInHTML = (data: string) => {
  return `<!DOCTYPE html> <html lang="en"> <head> <meta name="viewport" content="width=device-width, initial-scale=1.0"> </head> <body> <div> ${data}</div></body></html>`;
};

export const SummerNoteHtml = (
  editorHtml: string,
  disableSummerNote: string,
) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Summernote</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.js"></script>
  </head>
  <body>
    <div id="summernote">${editorHtml}</div>
    <script>
      $(document).ready(function() {
          $('#summernote').summernote({                 // set editor height
            minHeight: 250, 
        });
            ${disableSummerNote}
      });
     
      function getHtmlFromEditor(){
      editorHtml = $('.note-editable').html();
      window.ReactNativeWebView.postMessage(editorHtml)  
      }
    </script>
  </body>
  </html>`;
};
export function removeStyling(inputString: string) {
  // Remove inline style attributes
  let cleanedString = inputString.replace(/style="[^"]*"/g, '');

  // Remove HTML tags
  cleanedString = cleanedString.replace(/<[^>]*>/g, '');

  // Replace HTML entities
  cleanedString = cleanedString
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&iexcl;/g, '¡')
    .replace(/&cent;/g, '¢')
    .replace(/&pound;/g, '£')
    .replace(/&curren;/g, '¤')
    .replace(/&yen;/g, '¥')
    .replace(/&brvbar;/g, '¦')
    .replace(/&sect;/g, '§')
    .replace(/&uml;/g, '¨')
    .replace(/&copy;/g, '©')
    .replace(/&ordf;/g, 'ª')
    .replace(/&laquo;/g, '«')
    .replace(/&not;/g, '¬')
    .replace(/&reg;/g, '®')
    .replace(/&macr;/g, '¯')
    .replace(/&deg;/g, '°')
    .replace(/&plusmn;/g, '±')
    .replace(/&sup2;/g, '²')
    .replace(/&sup3;/g, '³')
    .replace(/&acute;/g, '´')
    .replace(/&micro;/g, 'µ')
    .replace(/&para;/g, '¶')
    .replace(/&middot;/g, '·')
    .replace(/&cedil;/g, '¸')
    .replace(/&sup1;/g, '¹')
    .replace(/&ordm;/g, 'º')
    .replace(/&raquo;/g, '»')
    .replace(/&frac14;/g, '¼')
    .replace(/&frac12;/g, '½')
    .replace(/&frac34;/g, '¾')
    .replace(/&iquest;/g, '¿')
    .replace(/&Agrave;/g, 'À')
    .replace(/&Aacute;/g, 'Á')
    .replace(/&Acirc;/g, 'Â')
    .replace(/&Atilde;/g, 'Ã')
    .replace(/&Auml;/g, 'Ä')
    .replace(/&Aring;/g, 'Å')
    .replace(/&AElig;/g, 'Æ')
    .replace(/&Ccedil;/g, 'Ç')
    .replace(/&Egrave;/g, 'È')
    .replace(/&Eacute;/g, 'É')
    .replace(/&Ecirc;/g, 'Ê')
    .replace(/&Euml;/g, 'Ë')
    .replace(/&Igrave;/g, 'Ì')
    .replace(/&Iacute;/g, 'Í')
    .replace(/&Icirc;/g, 'Î')
    .replace(/&Iuml;/g, 'Ï')
    .replace(/&ETH;/g, 'Ð')
    .replace(/&Ntilde;/g, 'Ñ')
    .replace(/&Ograve;/g, 'Ò')
    .replace(/&Oacute;/g, 'Ó')
    .replace(/&Ocirc;/g, 'Ô')
    .replace(/&Otilde;/g, 'Õ')
    .replace(/&Ouml;/g, 'Ö')
    .replace(/&times;/g, '×')
    .replace(/&Oslash;/g, 'Ø')
    .replace(/&Ugrave;/g, 'Ù')
    .replace(/&Uacute;/g, 'Ú')
    .replace(/&Ucirc;/g, 'Û')
    .replace(/&Uuml;/g, 'Ü')
    .replace(/&Yacute;/g, 'Ý')
    .replace(/&THORN;/g, 'Þ')
    .replace(/&szlig;/g, 'ß')
    .replace(/&agrave;/g, 'à')
    .replace(/&aacute;/g, 'á')
    .replace(/&acirc;/g, 'â')
    .replace(/&atilde;/g, 'ã')
    .replace(/&auml;/g, 'ä')
    .replace(/&aring;/g, 'å')
    .replace(/&aelig;/g, 'æ')
    .replace(/&ccedil;/g, 'ç')
    .replace(/&egrave;/g, 'è')
    .replace(/&eacute;/g, 'é')
    .replace(/&ecirc;/g, 'ê')
    .replace(/&euml;/g, 'ë')
    .replace(/&igrave;/g, 'ì')
    .replace(/&iacute;/g, 'í')
    .replace(/&icirc;/g, 'î')
    .replace(/&iuml;/g, 'ï')
    .replace(/&eth;/g, 'ð')
    .replace(/&ntilde;/g, 'ñ')
    .replace(/&ograve;/g, 'ò')
    .replace(/&oacute;/g, 'ó')
    .replace(/&ocirc;/g, 'ô')
    .replace(/&otilde;/g, 'õ')
    .replace(/&ouml;/g, 'ö')
    .replace(/&divide;/g, '÷')
    .replace(/&oslash;/g, 'ø')
    .replace(/&ugrave;/g, 'ù')
    .replace(/&uacute;/g, 'ú')
    .replace(/&ucirc;/g, 'û')
    .replace(/&uuml;/g, 'ü')
    .replace(/&yacute;/g, 'ý')
    .replace(/&thorn;/g, 'þ')
    .replace(/&yuml;/g, 'ÿ');
  // cleanedString = cleanedString.replace(/&lt;/g, '<');
  // cleanedString = cleanedString.replace(/&gt;/g, '>');
  // cleanedString = cleanedString.replace(/&quot;/g, '"');
  // cleanedString = cleanedString.replace(/&nbsp;/g, ' ');

  return cleanedString;
}
