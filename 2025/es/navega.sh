
for f in *.html;
    do sed -i -e '/<!-- BEGIN HEADER -->/r ../navega_es.html' -e '/<!-- BEGIN HEADER -->/,/<!-- END HEADER -->/d' $f;
done;
