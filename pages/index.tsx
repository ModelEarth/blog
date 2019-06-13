import React from "react"
import Page from "../src/components/Page"
import PagePreview from "../src/components/PagePreview"
import { formatDate } from "../src/utils/date"
import { makeUrl, filterPosts } from "../src/utils/content"

import CONFIG from "../content/index.json"
import SUMMARY_JSON from "../content/summary.json"

export type LinkInfo = {
	text: string
	href: string
}
export type ConfigJson = {
	siteTitle: string
	description: string
	stylesheets: string[]
	topLinks: LinkInfo[]

	backgroundClass: string
	copyright: string
	siteId: string
	bodyContent: string
	bodyHtml: string
	dir: string
	base: string
	ext: string
	sourceBase: string
	sourceExt: string
}
export type SummaryJson = {
	fileMap: {
		[fname: string]: PostSummary
	}
}
export type PostSummary = {
	title: string
	date: string
	page: string
	paths: string[]
	preview: string
	dir: string
	base: string
	ext: string
	sourceBase: string
	sourceExt: string
}
export interface PostJson extends PostSummary {
	bodyContent: string
	bodyHtml: string
}

function Index(_props: {}) {
	return (
		<div>
			<Page
				siteTitle={`${CONFIG.siteTitle} - Index`}
				heroTitle={CONFIG.siteTitle}
				description={CONFIG.description}
				stylesheets={CONFIG.stylesheets}
				topLinks={CONFIG.topLinks}
				backgroundClass={CONFIG.backgroundClass}
				body={Body({
					summaryJson: (SUMMARY_JSON as any) as SummaryJson,
				})}
				copyright={CONFIG.copyright}
				siteId={CONFIG.siteId}
			/>
		</div>
	)
}

function Body(props: { summaryJson: SummaryJson }) {
	const postList = filterPosts(props.summaryJson)
	return (
		<div className="center mw6 pa3 pa4-ns">
			{postList.map((article, i) => {
				const href = makeUrl(article)
				const date = formatDate(article.date)
				return (
					<PagePreview
						title={article.title}
						preview={article.preview}
						date={date}
						href={href}
						key={i}
					/>
				)
			})}
		</div>
	)
}

export default Index
