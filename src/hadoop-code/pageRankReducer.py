#!/usr/bin/env python
import sys

links_to = ''
current_page_rank = 0
current_art = ''
index = {}
for line in sys.stdin:
    values = line.rstrip('\n').split('\t')

    articleTitle = values[0]
    content = values[1]
    
    if (len(content) > 0 and content[0] == '$'):
        if (articleTitle in index):
            index[articleTitle][0] = content[1:]
        else:
            index[articleTitle] = [content[1:],0]
    elif (len(content) > 0):
        if (articleTitle in index):
            index[articleTitle][1] += float(content)
        else:
            index[articleTitle] = ['',float(content)]

for key, value in index.items():
    print('%s\t%s' % (key, value[0]+':'+str(value[1])))

sys.exit(0)
