widgets:
	mkdir -p dist tmp
	cp src/style.css dist
	java -jar tools/yuicompressor-2.4.6.jar -v -o dist/style.min.css src/style.css
	coffee -b -c -o tmp/ src/init.coffee
	cat src/header.js src/loaders.js src/tinybox.js tmp/init.js src/footer.js > dist/widgets.js
	java -jar tools/yuicompressor-2.4.6.jar --type js --charset UTF-8 -v -o dist/widgets.min.js dist/widgets.js
	rm -rf tmp/