LEEME:
	echo "\nCuidado. Lee el makefile antes de usarlo."

all:
	make -C es/
	make -C es/ HEADER
	make -C es/ FOOTER
	make -C en/
	make -C en/ HEADER
	make -C en/ FOOTER


