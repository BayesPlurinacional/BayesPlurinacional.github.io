for i in *.html;
    do sed -i -e '/<!-- BEGIN LOGOS -->/r ../logos.html' -e '/<!-- BEGIN LOGOS -->/,/<!-- END LOGOS -->/d' "$i"
done;
