#!/bin/bash

if [[ -z $1 || $1 == "css" ]]; then
	echo "Compressing CSS...";
	cd css;
	tail -n +3 style.scss > _style.scss;
	node-sass _style.scss style.css;
	rm _style.scss;
	cd ..;
fi
