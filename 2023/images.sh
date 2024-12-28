for i in *.html; do
       sed -i 's|<title>Bayes</title>|<title>Bayes 2023</title>|g' "$i"
done;
