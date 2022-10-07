#!/usr/bin/env python
import sys

for line in sys.stdin:
    values = line.rstrip('\n').split('\t')

    articleTitle = values[0]

    articleData = values[1].split(':')
    links_to = []
    if (len(articleData[0]) > 0):
        links_to = articleData[0].split(',')
    currentPageRank = float(articleData[1])
    # emit votes
    if (len(links_to) > 0):
        voteWeight = currentPageRank/len(links_to)
        for link in links_to:
            print('%s\t%s' % (link, voteWeight))
    
    # if no one links to me
    print('%s\t%s' % (articleTitle, 0))
    # send where we point to for next map iteration
    print('%s\t%s' % (articleTitle, '$' + articleData[0]))


sys.exit(0)
