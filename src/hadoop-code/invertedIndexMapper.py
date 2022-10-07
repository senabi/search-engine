#!/usr/bin/env python

import sys
import re
import os

def remove_punctuation(texto):
      return "".join(c for c in texto if c.isalnum() or c == ' ')  

tilde_table = str.maketrans('áéíóúÁÉÍÓÚäëïöüÄËÏÖÜ','aeiouAEIOUaeiouAEIOU', '´')
def eliminar_tilde(texto):
  return texto.translate(tilde_table)

def clean_text(texto):
  return remove_punctuation(eliminar_tilde(texto))

for line in sys.stdin:
	articleTitle = os.environ["map_input_file"]
	
	articleTitle = os.path.split(articleTitle)[-1]
	
	words = line.rstrip('\n').split()
	
	words = [clean_text(word) for word in words]
	
	for word in words:
		print("%s\t%s:1" % (word, articleTitle))
	
