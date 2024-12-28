
for f in *.html;
    do sed -i -e '/<!-- BEGIN HEADER -->/r ../navega_en.html' -e '/<!-- BEGIN HEADER -->/,/<!-- END HEADER -->/d' $f;
done;
