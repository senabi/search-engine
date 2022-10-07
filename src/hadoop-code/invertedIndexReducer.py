#!/usr/bin/env python

import sys

index = {}

for line in sys.stdin:
        word, articles = line.split('\t')

        index.setdefault(word, {})

        for article in articles.split(','):
                title, count = article.split(':')
                count = int(count)

                index[word].setdefault(title, 0)
                index[word][title] += count

for word in index:
        articles_list = ["%s:%d" % (title, index[word][title])
                         for title in index[word]]
        postings = ','.join(articles_list)
        print('%s\t%s' % (word, postings))
