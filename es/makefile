all:
	cp *.html backup/
	echo "README"

HEADER:
	sh navega.sh

FOOTER:
	for i in *.html; do
	sed -i -e '/<!-- BEGIN FOOTER -->/r ../footer.html' -e '/<!-- BEGIN FOOTER -->/,/<!-- END FOOTER -->/d' "$i"
	done
