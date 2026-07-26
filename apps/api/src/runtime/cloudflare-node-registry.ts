import {
  BaseNodeRegistry,
  FailingMultiStepNode,
  MultiStepAdditionNode,
} from "@workflowhub/runtime";
import { CreateRecordAirtableNode } from "@workflowhub/runtime/nodes/airtable/create-record-airtable-node";
import { SearchRecordsAirtableNode } from "@workflowhub/runtime/nodes/airtable/search-records-airtable-node";
import { UpdateRecordAirtableNode } from "@workflowhub/runtime/nodes/airtable/update-record-airtable-node";
import { CgsApplyMaterialNode } from "@workflowhub/runtime/nodes/3d/cgs-apply-material-node";
import { CgsApplyTextureNode } from "@workflowhub/runtime/nodes/3d/cgs-apply-texture-node";
import { CgsConeNode } from "@workflowhub/runtime/nodes/3d/cgs-cone-node";
import { CgsCubeNode } from "@workflowhub/runtime/nodes/3d/cgs-cube-node";
import { CgsCylinderNode } from "@workflowhub/runtime/nodes/3d/cgs-cylinder-node";
import { CgsDifferenceNode } from "@workflowhub/runtime/nodes/3d/cgs-difference-node";
import { CgsIntersectionNode } from "@workflowhub/runtime/nodes/3d/cgs-intersection-node";
import { CgsRotateNode } from "@workflowhub/runtime/nodes/3d/cgs-rotate-node";
import { CgsScaleNode } from "@workflowhub/runtime/nodes/3d/cgs-scale-node";
import { CgsSphereNode } from "@workflowhub/runtime/nodes/3d/cgs-sphere-node";
import { CgsTorusNode } from "@workflowhub/runtime/nodes/3d/cgs-torus-node";
import { CgsTranslateNode } from "@workflowhub/runtime/nodes/3d/cgs-translate-node";
import { CgsUnionNode } from "@workflowhub/runtime/nodes/3d/cgs-union-node";
import { CgsXorNode } from "@workflowhub/runtime/nodes/3d/cgs-xor-node";
import { DemToGltfNode } from "@workflowhub/runtime/nodes/3d/dem-to-gltf-node";
import { GeoTiffDemQueryNode } from "@workflowhub/runtime/nodes/3d/geotiff-dem-query-node";
import { GeoTiffMetadataReaderNode } from "@workflowhub/runtime/nodes/3d/geotiff-metadata-reader-node";
import { GeoTiffQueryNode } from "@workflowhub/runtime/nodes/3d/geotiff-query-node";
import { GeoTiffTransformNode } from "@workflowhub/runtime/nodes/3d/geotiff-transform-node";
import { GltfWireframeNode } from "@workflowhub/runtime/nodes/3d/gltf-wireframe-node";
import { AgentClaudeSonnet4Node } from "@workflowhub/runtime/nodes/agent/agent-claude-sonnet-4-node";
import { AgentGemini25FlashNode } from "@workflowhub/runtime/nodes/agent/agent-gemini-2-5-flash-node";
import { AgentGemini31ProNode } from "@workflowhub/runtime/nodes/agent/agent-gemini-3-1-pro-node";
import { AgentGemini3FlashNode } from "@workflowhub/runtime/nodes/agent/agent-gemini-3-flash-node";
import { AgentGpt41Node } from "@workflowhub/runtime/nodes/agent/agent-gpt-41-node";
import { AgentQwen330BA3BFp8Node } from "@workflowhub/runtime/nodes/agent/agent-qwen3-30b-a3b-fp8-node";
import { Claude3OpusNode } from "@workflowhub/runtime/nodes/anthropic/claude-3-opus-node";
import { Claude35HaikuNode } from "@workflowhub/runtime/nodes/anthropic/claude-35-haiku-node";
import { Claude35SonnetNode } from "@workflowhub/runtime/nodes/anthropic/claude-35-sonnet-node";
import { Claude37SonnetNode } from "@workflowhub/runtime/nodes/anthropic/claude-37-sonnet-node";
import { ClaudeOpus4Node } from "@workflowhub/runtime/nodes/anthropic/claude-opus-4-node";
import { ClaudeOpus41Node } from "@workflowhub/runtime/nodes/anthropic/claude-opus-41-node";
import { ClaudeSonnet4Node } from "@workflowhub/runtime/nodes/anthropic/claude-sonnet-4-node";
import { AggregateItemsNode } from "@workflowhub/runtime/nodes/array/aggregate-items-node";
import { ExtractItemNode } from "@workflowhub/runtime/nodes/array/extract-item-node";
import { BlobToFormDataNode } from "@workflowhub/runtime/nodes/blob/blob-to-form-data-node";
import { BlobToJsonNode } from "@workflowhub/runtime/nodes/blob/blob-to-json-node";
import { BlobToTextNode } from "@workflowhub/runtime/nodes/blob/blob-to-text-node";
import { FileNode } from "@workflowhub/runtime/nodes/blob/file-node";
import { JsonToBlobNode } from "@workflowhub/runtime/nodes/blob/json-to-blob-node";
import { TextToBlobNode } from "@workflowhub/runtime/nodes/blob/text-to-blob-node";
import { CloudflareBrowserContentNode } from "@workflowhub/runtime/nodes/browser/cloudflare-browser-content-node";
import { CloudflareBrowserCrawlNode } from "@workflowhub/runtime/nodes/browser/cloudflare-browser-crawl-node";
import { CloudflareBrowserCrawlQueueNode } from "@workflowhub/runtime/nodes/browser/cloudflare-browser-crawl-queue-node";
import { CloudflareBrowserJsonNode } from "@workflowhub/runtime/nodes/browser/cloudflare-browser-json-node";
import { CloudflareBrowserLinksNode } from "@workflowhub/runtime/nodes/browser/cloudflare-browser-links-node";
import { CloudflareBrowserMarkdownNode } from "@workflowhub/runtime/nodes/browser/cloudflare-browser-markdown-node";
import { CloudflareBrowserPdfNode } from "@workflowhub/runtime/nodes/browser/cloudflare-browser-pdf-node";
import { CloudflareBrowserScrapeNode } from "@workflowhub/runtime/nodes/browser/cloudflare-browser-scrape-node";
import { CloudflareBrowserScreenshotNode } from "@workflowhub/runtime/nodes/browser/cloudflare-browser-screenshot-node";
import { CloudflareBrowserSnapshotNode } from "@workflowhub/runtime/nodes/browser/cloudflare-browser-snapshot-node";
import { CloudflareGatewayModelNode } from "@workflowhub/runtime/nodes/cloudflare/cloudflare-gateway-model-node";
import { CloudflareModelNode } from "@workflowhub/runtime/nodes/cloudflare/cloudflare-model-node";
import { CsvExtractColumnNode } from "@workflowhub/runtime/nodes/csv/csv-extract-column-node";
import { CsvFilterRowsNode } from "@workflowhub/runtime/nodes/csv/csv-filter-rows-node";
import { CsvParseNode } from "@workflowhub/runtime/nodes/csv/csv-parse-node";
import { CsvStringifyNode } from "@workflowhub/runtime/nodes/csv/csv-stringify-node";
import { DatabaseCreateTableNode } from "@workflowhub/runtime/nodes/database/database-create-table-node";
import { DatabaseDeleteRowNode } from "@workflowhub/runtime/nodes/database/database-delete-row-node";
import { DatabaseDescribeTableNode } from "@workflowhub/runtime/nodes/database/database-describe-table-node";
import { DatabaseDropTableNode } from "@workflowhub/runtime/nodes/database/database-drop-table-node";
import { DatabaseExecuteNode } from "@workflowhub/runtime/nodes/database/database-execute-node";
import { DatabaseExportTableNode } from "@workflowhub/runtime/nodes/database/database-export-table-node";
import { DatabaseGetRowCountNode } from "@workflowhub/runtime/nodes/database/database-get-row-count-node";
import { DatabaseGetRowNode } from "@workflowhub/runtime/nodes/database/database-get-row-node";
import { DatabaseImportTableNode } from "@workflowhub/runtime/nodes/database/database-import-table-node";
import { DatabaseListTablesNode } from "@workflowhub/runtime/nodes/database/database-list-tables-node";
import { DatabasePutRowNode } from "@workflowhub/runtime/nodes/database/database-put-row-node";
import { DatabaseQueryNode } from "@workflowhub/runtime/nodes/database/database-query-node";
import { DatabaseRowExistsNode } from "@workflowhub/runtime/nodes/database/database-row-exists-node";
import { DatabaseTableExistsNode } from "@workflowhub/runtime/nodes/database/database-table-exists-node";
import { DatabaseTruncateTableNode } from "@workflowhub/runtime/nodes/database/database-truncate-table-node";
import { ParquetQueryNode } from "@workflowhub/runtime/nodes/database/parquet-query-node";
import { DatasetAiSearchNode } from "@workflowhub/runtime/nodes/dataset/dataset-ai-search-node";
import { DatasetDeleteFileNode } from "@workflowhub/runtime/nodes/dataset/dataset-delete-file-node";
import { DatasetDownloadFileNode } from "@workflowhub/runtime/nodes/dataset/dataset-download-file-node";
import { DatasetListFilesNode } from "@workflowhub/runtime/nodes/dataset/dataset-list-files-node";
import { DatasetSearchNode } from "@workflowhub/runtime/nodes/dataset/dataset-search-node";
import { DatasetUploadFileNode } from "@workflowhub/runtime/nodes/dataset/dataset-upload-file-node";
import { AddDateNode } from "@workflowhub/runtime/nodes/date/add-date-node";
import { DiffDateNode } from "@workflowhub/runtime/nodes/date/diff-date-node";
import { NowDateNode } from "@workflowhub/runtime/nodes/date/now-date-node";
import { ParseDateNode } from "@workflowhub/runtime/nodes/date/parse-date-node";
import { AddReactionDiscordNode } from "@workflowhub/runtime/nodes/discord/add-reaction-discord-node";
import { BotAddReactionDiscordNode } from "@workflowhub/runtime/nodes/discord/bot-add-reaction-discord-node";
import { BotReceiveDiscordMessageNode } from "@workflowhub/runtime/nodes/discord/bot-receive-discord-message-node";
import { BotSendDMDiscordNode } from "@workflowhub/runtime/nodes/discord/bot-send-dm-discord-node";
import { BotSendMessageDiscordNode } from "@workflowhub/runtime/nodes/discord/bot-send-message-discord-node";
import { GetChannelDiscordNode } from "@workflowhub/runtime/nodes/discord/get-channel-discord-node";
import { GetGuildDiscordNode } from "@workflowhub/runtime/nodes/discord/get-guild-discord-node";
import { ListGuildChannelsDiscordNode } from "@workflowhub/runtime/nodes/discord/list-guild-channels-discord-node";
import { ListUserGuildsDiscordNode } from "@workflowhub/runtime/nodes/discord/list-user-guilds-discord-node";
import { SendDMDiscordNode } from "@workflowhub/runtime/nodes/discord/send-dm-discord-node";
import { SendMessageDiscordNode } from "@workflowhub/runtime/nodes/discord/send-message-discord-node";
import { ToMarkdownNode } from "@workflowhub/runtime/nodes/document/to-markdown-node";
import { EmailAgentClaudeSonnet4Node } from "@workflowhub/runtime/nodes/email/email-agent-claude-sonnet-4-node";
import { ExtractEmailAttachmentsNode } from "@workflowhub/runtime/nodes/email/extract-email-attachments-node";
import { GetEmailThreadNode } from "@workflowhub/runtime/nodes/email/get-email-thread-node";
import { ParseEmailNode } from "@workflowhub/runtime/nodes/email/parse-email-node";
import { ReceiveEmailNode } from "@workflowhub/runtime/nodes/email/receive-email-node";
import { SendEmailNode } from "@workflowhub/runtime/nodes/email/send-email-node";
import { FetchNode } from "@workflowhub/runtime/nodes/fetch/fetch-node";
import { FormRequestNode } from "@workflowhub/runtime/nodes/form/form-request-node";
// import { TrashMessageGoogleMailNode } from "@workflowhub/runtime/nodes/google-mail/trash-message-google-mail-node";
// import { UpdateDraftGoogleMailNode } from "@workflowhub/runtime/nodes/google-mail/update-draft-google-mail-node";
import { FormResponseNode } from "@workflowhub/runtime/nodes/form/form-response-node";
import { FormWebhookNode } from "@workflowhub/runtime/nodes/form/form-webhook-node";
import { Gemini25FlashAudioUnderstandingNode } from "@workflowhub/runtime/nodes/gemini/gemini-2-5-flash-audio-understanding-node";
import { Gemini25FlashImagePreviewNode } from "@workflowhub/runtime/nodes/gemini/gemini-2-5-flash-image-preview-node";
import { Gemini25FlashImageUnderstandingNode } from "@workflowhub/runtime/nodes/gemini/gemini-2-5-flash-image-understanding-node";
import { Gemini25FlashNode } from "@workflowhub/runtime/nodes/gemini/gemini-2-5-flash-node";
import { Gemini25FlashTtsNode } from "@workflowhub/runtime/nodes/gemini/gemini-2-5-flash-tts-node";
import { Gemini25ProAudioUnderstandingNode } from "@workflowhub/runtime/nodes/gemini/gemini-2-5-pro-audio-understanding-node";
import { Gemini25ProImageUnderstandingNode } from "@workflowhub/runtime/nodes/gemini/gemini-2-5-pro-image-understanding-node";
import { Gemini25ProNode } from "@workflowhub/runtime/nodes/gemini/gemini-2-5-pro-node";
import { Gemini31FlashImagePreviewNode } from "@workflowhub/runtime/nodes/gemini/gemini-3-1-flash-image-preview-node";
import { Gemini31ProNode } from "@workflowhub/runtime/nodes/gemini/gemini-3-1-pro-node";
import { Gemini3FlashNode } from "@workflowhub/runtime/nodes/gemini/gemini-3-flash-node";
import { Gemini3ProImagePreviewNode } from "@workflowhub/runtime/nodes/gemini/gemini-3-pro-image-preview-node";
import { ImagenNode } from "@workflowhub/runtime/nodes/gemini/imagen-node";
import { AlongNode } from "@workflowhub/runtime/nodes/geo/along-node";
import { AngleNode } from "@workflowhub/runtime/nodes/geo/angle-node";
import { AreaNode } from "@workflowhub/runtime/nodes/geo/area-node";
import { BboxClipNode } from "@workflowhub/runtime/nodes/geo/bbox-clip-node";
import { BboxNode } from "@workflowhub/runtime/nodes/geo/bbox-node";
import { BboxPolygonNode } from "@workflowhub/runtime/nodes/geo/bbox-polygon-node";
import { BearingNode } from "@workflowhub/runtime/nodes/geo/bearing-node";
import { BooleanClockwiseNode } from "@workflowhub/runtime/nodes/geo/boolean-clockwise-node";
import { BooleanConcaveNode } from "@workflowhub/runtime/nodes/geo/boolean-concave-node";
import { BooleanContainsNode } from "@workflowhub/runtime/nodes/geo/boolean-contains-node";
import { BooleanCrossesNode } from "@workflowhub/runtime/nodes/geo/boolean-crosses-node";
import { BooleanDisjointNode } from "@workflowhub/runtime/nodes/geo/boolean-disjoint-node";
import { BooleanEqualNode } from "@workflowhub/runtime/nodes/geo/boolean-equal-node";
import { BooleanIntersectsNode } from "@workflowhub/runtime/nodes/geo/boolean-intersects-node";
import { BooleanOverlapNode } from "@workflowhub/runtime/nodes/geo/boolean-overlap-node";
import { BooleanParallelNode } from "@workflowhub/runtime/nodes/geo/boolean-parallel-node";
import { BooleanPointInPolygonNode } from "@workflowhub/runtime/nodes/geo/boolean-point-in-polygon-node";
import { BooleanPointOnLineNode } from "@workflowhub/runtime/nodes/geo/boolean-point-on-line-node";
import { BooleanTouchesNode } from "@workflowhub/runtime/nodes/geo/boolean-touches-node";
import { BooleanValidNode } from "@workflowhub/runtime/nodes/geo/boolean-valid-node";
import { BooleanWithinNode } from "@workflowhub/runtime/nodes/geo/boolean-within-node";
import { BufferNode } from "@workflowhub/runtime/nodes/geo/buffer-node";
import { CenterMeanNode } from "@workflowhub/runtime/nodes/geo/center-mean-node";
import { CenterMedianNode } from "@workflowhub/runtime/nodes/geo/center-median-node";
import { CenterNode } from "@workflowhub/runtime/nodes/geo/center-node";
import { CenterOfMassNode } from "@workflowhub/runtime/nodes/geo/center-of-mass-node";
import { CentroidNode } from "@workflowhub/runtime/nodes/geo/centroid-node";
import { CircleNode } from "@workflowhub/runtime/nodes/geo/circle-node";
import { CleanCoordsNode } from "@workflowhub/runtime/nodes/geo/clean-coords-node";
import { CombineNode } from "@workflowhub/runtime/nodes/geo/combine-node";
import { ConcaveNode } from "@workflowhub/runtime/nodes/geo/concave-node";
import { ConvexNode } from "@workflowhub/runtime/nodes/geo/convex-node";
import { DestinationNode } from "@workflowhub/runtime/nodes/geo/destination-node";
import { DifferenceNode } from "@workflowhub/runtime/nodes/geo/difference-node";
import { DistanceNode } from "@workflowhub/runtime/nodes/geo/distance-node";
import { EnvelopeNode } from "@workflowhub/runtime/nodes/geo/envelope-node";
import { ExplodeNode } from "@workflowhub/runtime/nodes/geo/explode-node";
import { FeatureCollectionNode } from "@workflowhub/runtime/nodes/geo/feature-collection-node";
import { FeatureNode } from "@workflowhub/runtime/nodes/geo/feature-node";
import { FlattenNode } from "@workflowhub/runtime/nodes/geo/flatten-node";
import { FlipNode } from "@workflowhub/runtime/nodes/geo/flip-node";
import { GeoJsonNode } from "@workflowhub/runtime/nodes/geo/geojson-node";
import { GeoJsonToSvgNode } from "@workflowhub/runtime/nodes/geo/geojson-to-svg-node";
import { GeometryCollectionNode } from "@workflowhub/runtime/nodes/geo/geometry-collection-node";
import { GreatCircleNode } from "@workflowhub/runtime/nodes/geo/great-circle-node";
import { IntersectNode } from "@workflowhub/runtime/nodes/geo/intersect-node";
import { KinksNode } from "@workflowhub/runtime/nodes/geo/kinks-node";
import { LengthNode } from "@workflowhub/runtime/nodes/geo/length-node";
import { LineArcNode } from "@workflowhub/runtime/nodes/geo/line-arc-node";
import { LineChunkNode } from "@workflowhub/runtime/nodes/geo/line-chunk-node";
import { LineIntersectNode } from "@workflowhub/runtime/nodes/geo/line-intersect-node";
import { LineOffsetNode } from "@workflowhub/runtime/nodes/geo/line-offset-node";
import { LineOverlapNode } from "@workflowhub/runtime/nodes/geo/line-overlap-node";
import { LineSegmentNode } from "@workflowhub/runtime/nodes/geo/line-segment-node";
import { LineSliceAlongNode } from "@workflowhub/runtime/nodes/geo/line-slice-along-node";
import { LineSliceNode } from "@workflowhub/runtime/nodes/geo/line-slice-node";
import { LineSplitNode } from "@workflowhub/runtime/nodes/geo/line-split-node";
import { LineToPolygonNode } from "@workflowhub/runtime/nodes/geo/line-to-polygon-node";
import { LineStringNode } from "@workflowhub/runtime/nodes/geo/linestring-node";
import { MaskNode } from "@workflowhub/runtime/nodes/geo/mask-node";
import { MidpointNode } from "@workflowhub/runtime/nodes/geo/midpoint-node";
import { MultiLineStringNode } from "@workflowhub/runtime/nodes/geo/multilinestring-node";
import { MultiPointNode } from "@workflowhub/runtime/nodes/geo/multipoint-node";
import { MultiPolygonNode } from "@workflowhub/runtime/nodes/geo/multipolygon-node";
import { NearestPointNode } from "@workflowhub/runtime/nodes/geo/nearest-point-node";
import { NearestPointOnLineNode } from "@workflowhub/runtime/nodes/geo/nearest-point-on-line-node";
import { PointNode } from "@workflowhub/runtime/nodes/geo/point-node";
import { PointOnFeatureNode } from "@workflowhub/runtime/nodes/geo/point-on-feature-node";
import { PointToLineDistanceNode } from "@workflowhub/runtime/nodes/geo/point-to-line-distance-node";
import { PointToPolygonDistanceNode } from "@workflowhub/runtime/nodes/geo/point-to-polygon-distance-node";
import { PolygonNode } from "@workflowhub/runtime/nodes/geo/polygon-node";
import { PolygonSmoothNode } from "@workflowhub/runtime/nodes/geo/polygon-smooth-node";
import { PolygonTangentsNode } from "@workflowhub/runtime/nodes/geo/polygon-tangents-node";
import { PolygonToLineNode } from "@workflowhub/runtime/nodes/geo/polygon-to-line-node";
import { PolygonizeNode } from "@workflowhub/runtime/nodes/geo/polygonize-node";
import { RewindNode } from "@workflowhub/runtime/nodes/geo/rewind-node";
import { RhumbBearingNode } from "@workflowhub/runtime/nodes/geo/rhumb-bearing-node";
import { RhumbDestinationNode } from "@workflowhub/runtime/nodes/geo/rhumb-destination-node";
import { RhumbDistanceNode } from "@workflowhub/runtime/nodes/geo/rhumb-distance-node";
import { RoundNode } from "@workflowhub/runtime/nodes/geo/round-node";
import { SectorNode } from "@workflowhub/runtime/nodes/geo/sector-node";
import { ShortestPathNode } from "@workflowhub/runtime/nodes/geo/shortest-path-node";
import { SimplifyNode } from "@workflowhub/runtime/nodes/geo/simplify-node";
import { SquareNode } from "@workflowhub/runtime/nodes/geo/square-node";
import { TransformRotateNode } from "@workflowhub/runtime/nodes/geo/transform-rotate-node";
import { TransformScaleNode } from "@workflowhub/runtime/nodes/geo/transform-scale-node";
import { TransformTranslateNode } from "@workflowhub/runtime/nodes/geo/transform-translate-node";
import { TruncateNode } from "@workflowhub/runtime/nodes/geo/truncate-node";
import { UnionNode } from "@workflowhub/runtime/nodes/geo/union-node";
import { UnkinkPolygonNode } from "@workflowhub/runtime/nodes/geo/unkink-polygon-node";
import { VoronoiNode } from "@workflowhub/runtime/nodes/geo/voronoi-node";
import { WktGeometryNode } from "@workflowhub/runtime/nodes/geo/wkt-geometry-node";
import { CreateUpdateFileGithubNode } from "@workflowhub/runtime/nodes/github/create-update-file-github-node";
import { CreateIssueGithubNode } from "@workflowhub/runtime/nodes/github/create-issue-github-node";
import { CreatePullRequestGithubNode } from "@workflowhub/runtime/nodes/github/create-pull-request-github-node";
import { DeleteFileGithubNode } from "@workflowhub/runtime/nodes/github/delete-file-github-node";
import { FollowUserGithubNode } from "@workflowhub/runtime/nodes/github/follow-user-github-node";
import { GetFileContentsGithubNode } from "@workflowhub/runtime/nodes/github/get-file-contents-github-node";
import { GetRepositoryGithubNode } from "@workflowhub/runtime/nodes/github/get-repository-github-node";
import { GetUserGithubNode } from "@workflowhub/runtime/nodes/github/get-user-github-node";
import { ListOrganizationRepositoriesGithubNode } from "@workflowhub/runtime/nodes/github/list-organization-repositories-github-node";
import { ListRepositoriesGithubNode } from "@workflowhub/runtime/nodes/github/list-repositories-github-node";
import { ListUserRepositoriesGithubNode } from "@workflowhub/runtime/nodes/github/list-user-repositories-github-node";
import { SearchRepositoriesGithubNode } from "@workflowhub/runtime/nodes/github/search-repositories-github-node";
import { StarRepositoryGithubNode } from "@workflowhub/runtime/nodes/github/star-repository-github-node";
import { UnfollowUserGithubNode } from "@workflowhub/runtime/nodes/github/unfollow-user-github-node";
import { UnstarRepositoryGithubNode } from "@workflowhub/runtime/nodes/github/unstar-repository-github-node";
import { AirQualityGoogleNode } from "@workflowhub/runtime/nodes/google/air-quality-google-node";
import { ElevationGoogleNode } from "@workflowhub/runtime/nodes/google/elevation-google-node";
import { GeocodingGoogleNode } from "@workflowhub/runtime/nodes/google/geocoding-google-node";
import { PlacesGoogleNode } from "@workflowhub/runtime/nodes/google/places-google-node";
import { PollenGoogleNode } from "@workflowhub/runtime/nodes/google/pollen-google-node";
import { TimezoneGoogleNode } from "@workflowhub/runtime/nodes/google/timezone-google-node";
import { WeatherGoogleNode } from "@workflowhub/runtime/nodes/google/weather-google-node";
import { AddAttendeesGoogleCalendarNode } from "@workflowhub/runtime/nodes/google-calendar/add-attendees-google-calendar-node";
import { CheckAvailabilityGoogleCalendarNode } from "@workflowhub/runtime/nodes/google-calendar/check-availability-google-calendar-node";
import { CreateEventGoogleCalendarNode } from "@workflowhub/runtime/nodes/google-calendar/create-event-google-calendar-node";
import { DeleteEventGoogleCalendarNode } from "@workflowhub/runtime/nodes/google-calendar/delete-event-google-calendar-node";
import { GetEventGoogleCalendarNode } from "@workflowhub/runtime/nodes/google-calendar/get-event-google-calendar-node";
import { ListCalendarsGoogleCalendarNode } from "@workflowhub/runtime/nodes/google-calendar/list-calendars-google-calendar-node";
import { ListEventsGoogleCalendarNode } from "@workflowhub/runtime/nodes/google-calendar/list-events-google-calendar-node";
import { QuickAddGoogleCalendarNode } from "@workflowhub/runtime/nodes/google-calendar/quick-add-google-calendar-node";
import { SearchEventsGoogleCalendarNode } from "@workflowhub/runtime/nodes/google-calendar/search-events-google-calendar-node";
import { UpdateEventGoogleCalendarNode } from "@workflowhub/runtime/nodes/google-calendar/update-event-google-calendar-node";
// import { ArchiveMessageGoogleMailNode } from "@workflowhub/runtime/nodes/google-mail/archive-message-google-mail-node";
// import { CheckDraftGoogleMailNode } from "@workflowhub/runtime/nodes/google-mail/check-draft-google-mail-node";
// import { CreateReplyDraftGoogleMailNode } from "@workflowhub/runtime/nodes/google-mail/create-reply-draft-google-mail-node";
// import { DeleteDraftGoogleMailNode } from "@workflowhub/runtime/nodes/google-mail/delete-draft-google-mail-node";
// import { GetMessageGoogleMailNode } from "@workflowhub/runtime/nodes/google-mail/get-message-google-mail-node";
// import { MarkMessageGoogleMailNode } from "@workflowhub/runtime/nodes/google-mail/mark-message-google-mail-node";
// import { ModifyLabelsGoogleMailNode } from "@workflowhub/runtime/nodes/google-mail/modify-labels-google-mail-node";
// import { ReadInboxGoogleMailNode } from "@workflowhub/runtime/nodes/google-mail/read-inbox-google-mail-node";
// import { SearchMessagesGoogleMailNode } from "@workflowhub/runtime/nodes/google-mail/search-messages-google-mail-node";
// import { SendDraftGoogleMailNode } from "@workflowhub/runtime/nodes/google-mail/send-draft-google-mail-node";
import { SendEmailGoogleMailNode } from "@workflowhub/runtime/nodes/google-mail/send-email-google-mail-node";
import { HttpRequestNode } from "@workflowhub/runtime/nodes/http/http-request-node";
import { HttpResponseNode } from "@workflowhub/runtime/nodes/http/http-response-node";
import { HttpWebhookNode } from "@workflowhub/runtime/nodes/http/http-webhook-node";
import { JsonBodyNode } from "@workflowhub/runtime/nodes/http/json-body-node";
import { TestAllTypesNode } from "@workflowhub/runtime/nodes/http/test-all-types-node";
import { ExifReaderNode } from "@workflowhub/runtime/nodes/image/exif-reader-node";
import { ImageUrlLoaderNode } from "@workflowhub/runtime/nodes/image/image-url-loader-node";
import { PhotonAddNoiseNode } from "@workflowhub/runtime/nodes/image/photon-add-noise-node";
import { PhotonAdjustBrightnessNode } from "@workflowhub/runtime/nodes/image/photon-adjust-brightness-node";
import { PhotonAdjustContrastNode } from "@workflowhub/runtime/nodes/image/photon-adjust-contrast-node";
import { PhotonAdjustHslLightnessNode } from "@workflowhub/runtime/nodes/image/photon-adjust-hsl-lightness-node";
import { PhotonAdjustHueNode } from "@workflowhub/runtime/nodes/image/photon-adjust-hue-node";
import { PhotonAdjustSaturationNode } from "@workflowhub/runtime/nodes/image/photon-adjust-saturation-node";
import { PhotonAlterRGBChannelsNode } from "@workflowhub/runtime/nodes/image/photon-alter-rgb-channels-node";
import { PhotonApplyFilterNode } from "@workflowhub/runtime/nodes/image/photon-apply-filter-node";
import { PhotonBlendImagesNode } from "@workflowhub/runtime/nodes/image/photon-blend-images-node";
import { PhotonCropNode } from "@workflowhub/runtime/nodes/image/photon-crop-node";
import { PhotonEdgeDetectionNode } from "@workflowhub/runtime/nodes/image/photon-edge-detection-node";
import { PhotonEmbossNode } from "@workflowhub/runtime/nodes/image/photon-emboss-node";
import { PhotonFitNode } from "@workflowhub/runtime/nodes/image/photon-fit-node";
import { PhotonFlipImageNode } from "@workflowhub/runtime/nodes/image/photon-flip-image-node";
import { PhotonGaussianBlurNode } from "@workflowhub/runtime/nodes/image/photon-gaussian-blur-node";
import { PhotonGrayscaleNode } from "@workflowhub/runtime/nodes/image/photon-grayscale-node";
import { PhotonImageInfoNode } from "@workflowhub/runtime/nodes/image/photon-image-info-node";
import { PhotonInvertColorsNode } from "@workflowhub/runtime/nodes/image/photon-invert-colors-node";
import { PhotonMixWithColorNode } from "@workflowhub/runtime/nodes/image/photon-mix-with-color-node";
import { PhotonOilPaintingNode } from "@workflowhub/runtime/nodes/image/photon-oil-painting-node";
import { PhotonPadNode } from "@workflowhub/runtime/nodes/image/photon-pad-node";
import { PhotonPixelizeNode } from "@workflowhub/runtime/nodes/image/photon-pixelize-node";
import { PhotonResizeNode } from "@workflowhub/runtime/nodes/image/photon-resize-node";
import { PhotonRotateImageNode } from "@workflowhub/runtime/nodes/image/photon-rotate-image-node";
import { PhotonSepiaNode } from "@workflowhub/runtime/nodes/image/photon-sepia-node";
import { PhotonSharpenNode } from "@workflowhub/runtime/nodes/image/photon-sharpen-node";
import { PhotonThresholdNode } from "@workflowhub/runtime/nodes/image/photon-threshold-node";
import { PhotonWatermarkNode } from "@workflowhub/runtime/nodes/image/photon-watermark-node";
import { SvgToPngNode } from "@workflowhub/runtime/nodes/image/svg-to-png-node";
import { AudioInputNode } from "@workflowhub/runtime/nodes/input/audio-input-node";
import { AudioRecorderInputNode } from "@workflowhub/runtime/nodes/input/audio-recorder-input-node";
import { BlobInputNode } from "@workflowhub/runtime/nodes/input/blob-input-node";
import { BooleanInputNode } from "@workflowhub/runtime/nodes/input/boolean-input-node";
import { CanvasInputNode } from "@workflowhub/runtime/nodes/input/canvas-input-node";
import { DateInputNode } from "@workflowhub/runtime/nodes/input/date-input-node";
import { DocumentInputNode } from "@workflowhub/runtime/nodes/input/document-input-node";
import { GeoJSONInputNode } from "@workflowhub/runtime/nodes/input/geojson-input-node";
import { GltfInputNode } from "@workflowhub/runtime/nodes/input/gltf-input-node";
import { ImageInputNode } from "@workflowhub/runtime/nodes/input/image-input-node";
import { JavaScriptInputNode } from "@workflowhub/runtime/nodes/input/javascript-input-node";
import { JsonInputNode } from "@workflowhub/runtime/nodes/input/json-input-node";
import { NumberInputNode } from "@workflowhub/runtime/nodes/input/number-input-node";
import { SecretInputNode } from "@workflowhub/runtime/nodes/input/secret-input-node";
import { SliderInputNode } from "@workflowhub/runtime/nodes/input/slider-input-node";
import { TextInputNode } from "@workflowhub/runtime/nodes/input/text-input-node";
import { VideoInputNode } from "@workflowhub/runtime/nodes/input/video-input-node";
import { WebcamInputNode } from "@workflowhub/runtime/nodes/input/webcam-input-node";
import { JavascriptNode } from "@workflowhub/runtime/nodes/javascript/javascript-node";
import { JsonAggNode } from "@workflowhub/runtime/nodes/json/json-agg-node";
import { JsonArrayLengthNode } from "@workflowhub/runtime/nodes/json/json-array-length-node";
import { JsonContainsNode } from "@workflowhub/runtime/nodes/json/json-contains-node";
import { JsonContainsPathNode } from "@workflowhub/runtime/nodes/json/json-contains-path-node";
import { JsonExecuteJavascriptNode } from "@workflowhub/runtime/nodes/json/json-execute-javascript-node";
import { JsonExtractAllNode } from "@workflowhub/runtime/nodes/json/json-extract-all-node";
import { JsonExtractBooleanNode } from "@workflowhub/runtime/nodes/json/json-extract-boolean-node";
import { JsonExtractNumberNode } from "@workflowhub/runtime/nodes/json/json-extract-number-node";
import { JsonExtractObjectNode } from "@workflowhub/runtime/nodes/json/json-extract-object-node";
import { JsonExtractStringNode } from "@workflowhub/runtime/nodes/json/json-extract-string-node";
import { JsonFlattenNode } from "@workflowhub/runtime/nodes/json/json-flatten-node";
import { JsonInsertNode } from "@workflowhub/runtime/nodes/json/json-insert-node";
import { JsonKeysNode } from "@workflowhub/runtime/nodes/json/json-keys-node";
import { JsonMergeNode } from "@workflowhub/runtime/nodes/json/json-merge-node";
import { JsonObjectAggNode } from "@workflowhub/runtime/nodes/json/json-object-agg-node";
import { JsonObjectKeysNode } from "@workflowhub/runtime/nodes/json/json-object-keys-node";
import { JsonObjectValuesNode } from "@workflowhub/runtime/nodes/json/json-object-values-node";
import { JsonRemoveNode } from "@workflowhub/runtime/nodes/json/json-remove-node";
import { JsonReplaceNode } from "@workflowhub/runtime/nodes/json/json-replace-node";
import { JsonSchemaComposeNode } from "@workflowhub/runtime/nodes/json/json-schema-compose-node";
import { JsonSchemaExtractNode } from "@workflowhub/runtime/nodes/json/json-schema-extract-node";
import { JsonSetNode } from "@workflowhub/runtime/nodes/json/json-set-node";
import { JsonStripNullsNode } from "@workflowhub/runtime/nodes/json/json-strip-nulls-node";
import { JsonTemplateNode } from "@workflowhub/runtime/nodes/json/json-template-node";
import { JsonToGeojsonNode } from "@workflowhub/runtime/nodes/json/json-to-geojson-node";
import { JsonTypeofNode } from "@workflowhub/runtime/nodes/json/json-typeof-node";
import { JsonValidNode } from "@workflowhub/runtime/nodes/json/json-valid-node";
import { CommentOnPostLinkedInNode } from "@workflowhub/runtime/nodes/linkedin/comment-on-post-linkedin-node";
import { GetPostCommentsLinkedInNode } from "@workflowhub/runtime/nodes/linkedin/get-post-comments-linkedin-node";
import { GetPostLikesLinkedInNode } from "@workflowhub/runtime/nodes/linkedin/get-post-likes-linkedin-node";
import { GetProfileLinkedInNode } from "@workflowhub/runtime/nodes/linkedin/get-profile-linkedin-node";
import { LikePostLinkedInNode } from "@workflowhub/runtime/nodes/linkedin/like-post-linkedin-node";
import { SharePostLinkedInNode } from "@workflowhub/runtime/nodes/linkedin/share-post-linkedin-node";
import { ConditionalForkNode } from "@workflowhub/runtime/nodes/logic/conditional-fork-node";
import { ConditionalJoinNode } from "@workflowhub/runtime/nodes/logic/conditional-join-node";
import { CreateFeedbackFormNode } from "@workflowhub/runtime/nodes/logic/create-feedback-form-node";
import { CreateFormNode } from "@workflowhub/runtime/nodes/logic/create-form-node";
import { SwitchForkNode } from "@workflowhub/runtime/nodes/logic/switch-fork-node";
import { SwitchJoinNode } from "@workflowhub/runtime/nodes/logic/switch-join-node";
import { WaitForFormNode } from "@workflowhub/runtime/nodes/logic/wait-for-form-node";
import { AbsoluteValueNode } from "@workflowhub/runtime/nodes/math/absolute-value-node";
import { AdditionNode } from "@workflowhub/runtime/nodes/math/addition-node";
import { AvgNode } from "@workflowhub/runtime/nodes/math/avg-node";
import { CalculatorNode } from "@workflowhub/runtime/nodes/math/calculator-node";
import { DivisionNode } from "@workflowhub/runtime/nodes/math/division-node";
import { ExponentiationNode } from "@workflowhub/runtime/nodes/math/exponentiation-node";
import { MaxNode } from "@workflowhub/runtime/nodes/math/max-node";
import { MedianNode } from "@workflowhub/runtime/nodes/math/median-node";
import { MinNode } from "@workflowhub/runtime/nodes/math/min-node";
import { ModuloNode } from "@workflowhub/runtime/nodes/math/modulo-node";
import { MultiplicationNode } from "@workflowhub/runtime/nodes/math/multiplication-node";
import { SquareRootNode } from "@workflowhub/runtime/nodes/math/square-root-node";
import { SubtractionNode } from "@workflowhub/runtime/nodes/math/subtraction-node";
import { SumNode } from "@workflowhub/runtime/nodes/math/sum-node";
import { Gpt5MiniNode } from "@workflowhub/runtime/nodes/openai/gpt-5-mini-node";
import { Gpt5NanoNode } from "@workflowhub/runtime/nodes/openai/gpt-5-nano-node";
import { Gpt5Node } from "@workflowhub/runtime/nodes/openai/gpt-5-node";
import { Gpt41Node } from "@workflowhub/runtime/nodes/openai/gpt-41-node";
import { AnyOutputNode } from "@workflowhub/runtime/nodes/output/any-output-node";
import { AudioOutputNode } from "@workflowhub/runtime/nodes/output/audio-output-node";
import { BlobOutputNode } from "@workflowhub/runtime/nodes/output/blob-output-node";
import { BooleanOutputNode } from "@workflowhub/runtime/nodes/output/boolean-output-node";
import { DateOutputNode } from "@workflowhub/runtime/nodes/output/date-output-node";
import { DocumentOutputNode } from "@workflowhub/runtime/nodes/output/document-output-node";
import { GeoJSONOutputNode } from "@workflowhub/runtime/nodes/output/geojson-output-node";
import { GltfOutputNode } from "@workflowhub/runtime/nodes/output/gltf-output-node";
import { ImageOutputNode } from "@workflowhub/runtime/nodes/output/image-output-node";
import { JsonOutputNode } from "@workflowhub/runtime/nodes/output/json-output-node";
import { NumberOutputNode } from "@workflowhub/runtime/nodes/output/number-output-node";
import { SecretOutputNode } from "@workflowhub/runtime/nodes/output/secret-output-node";
import { TextOutputNode } from "@workflowhub/runtime/nodes/output/text-output-node";
import { VideoOutputNode } from "@workflowhub/runtime/nodes/output/video-output-node";
import { ReceiveQueueMessageNode } from "@workflowhub/runtime/nodes/queue/receive-queue-message-node";
import { SendQueueBatchNode } from "@workflowhub/runtime/nodes/queue/send-queue-batch-node";
import { SendQueueMessageNode } from "@workflowhub/runtime/nodes/queue/send-queue-message-node";
import { RandomChoiceNode } from "@workflowhub/runtime/nodes/random/random-choice-node";
import { RandomNumberNode } from "@workflowhub/runtime/nodes/random/random-number-node";
import { RandomStringNode } from "@workflowhub/runtime/nodes/random/random-string-node";
import { RandomUuidNode } from "@workflowhub/runtime/nodes/random/random-uuid-node";
import { GetPostRedditNode } from "@workflowhub/runtime/nodes/reddit/get-post-reddit-node";
import { GetSubredditRedditNode } from "@workflowhub/runtime/nodes/reddit/get-subreddit-reddit-node";
import { GetUserRedditNode } from "@workflowhub/runtime/nodes/reddit/get-user-reddit-node";
import { ListCommentsRedditNode } from "@workflowhub/runtime/nodes/reddit/list-comments-reddit-node";
import { ListPostsRedditNode } from "@workflowhub/runtime/nodes/reddit/list-posts-reddit-node";
import { ListUserCommentsRedditNode } from "@workflowhub/runtime/nodes/reddit/list-user-comments-reddit-node";
import { ListUserPostsRedditNode } from "@workflowhub/runtime/nodes/reddit/list-user-posts-reddit-node";
import { SearchRedditNode } from "@workflowhub/runtime/nodes/reddit/search-reddit-node";
import { SearchSubredditsRedditNode } from "@workflowhub/runtime/nodes/reddit/search-subreddits-reddit-node";
import { SharePostRedditNode } from "@workflowhub/runtime/nodes/reddit/share-post-reddit-node";
import { SubmitCommentRedditNode } from "@workflowhub/runtime/nodes/reddit/submit-comment-reddit-node";
import { VoteRedditNode } from "@workflowhub/runtime/nodes/reddit/vote-reddit-node";
import { ReplicateModelNode } from "@workflowhub/runtime/nodes/replicate/replicate-model-node";
import { BashNode } from "@workflowhub/runtime/nodes/sandbox/bash-node";
import { CNode } from "@workflowhub/runtime/nodes/sandbox/c-node";
import { GoNode } from "@workflowhub/runtime/nodes/sandbox/go-node";
import { JavaNode } from "@workflowhub/runtime/nodes/sandbox/java-node";
import { NodejsNode } from "@workflowhub/runtime/nodes/sandbox/nodejs-node";
import { PythonNode } from "@workflowhub/runtime/nodes/sandbox/python-node";
import { RustNode } from "@workflowhub/runtime/nodes/sandbox/rust-node";
import { TypescriptNode } from "@workflowhub/runtime/nodes/sandbox/typescript-node";
import { ReceiveScheduledTriggerNode } from "@workflowhub/runtime/nodes/scheduled/receive-scheduled-trigger-node";
import { BotAddReactionSlackNode } from "@workflowhub/runtime/nodes/slack/bot-add-reaction-slack-node";
import { BotReceiveSlackMessageNode } from "@workflowhub/runtime/nodes/slack/bot-receive-slack-message-node";
import { BotSendMessageSlackNode } from "@workflowhub/runtime/nodes/slack/bot-send-message-slack-node";
import { CreateChannelSlackNode } from "@workflowhub/runtime/nodes/slack/create-channel-slack-node";
import { ListChannelsSlackNode } from "@workflowhub/runtime/nodes/slack/list-channels-slack-node";
import { SendMessageSlackNode } from "@workflowhub/runtime/nodes/slack/send-message-slack-node";
import { ExtractTavilyNode } from "@workflowhub/runtime/nodes/tavily/extract-tavily-node";
import { SearchTavilyNode } from "@workflowhub/runtime/nodes/tavily/search-tavily-node";
import { BotForwardMessageTelegramNode } from "@workflowhub/runtime/nodes/telegram/bot-forward-message-telegram-node";
import { BotGetChatTelegramNode } from "@workflowhub/runtime/nodes/telegram/bot-get-chat-telegram-node";
import { BotReceiveTelegramMessageNode } from "@workflowhub/runtime/nodes/telegram/bot-receive-telegram-message-node";
import { BotSendMessageTelegramNode } from "@workflowhub/runtime/nodes/telegram/bot-send-message-telegram-node";
import { BotSendPhotoTelegramNode } from "@workflowhub/runtime/nodes/telegram/bot-send-photo-telegram-node";
import { JsonStringTemplateNode } from "@workflowhub/runtime/nodes/text/json-string-template-node";
import { RegexExtractNode } from "@workflowhub/runtime/nodes/text/regex-extract-node";
import { RegexMatchNode } from "@workflowhub/runtime/nodes/text/regex-match-node";
import { RegexReplaceNode } from "@workflowhub/runtime/nodes/text/regex-replace-node";
import { RegexSplitNode } from "@workflowhub/runtime/nodes/text/regex-split-node";
import { StringConcatNode } from "@workflowhub/runtime/nodes/text/string-concat-node";
import { StringEqualsNode } from "@workflowhub/runtime/nodes/text/string-equals-node";
import { StringIncludesNode } from "@workflowhub/runtime/nodes/text/string-includes-node";
import { StringIndexOfNode } from "@workflowhub/runtime/nodes/text/string-index-of-node";
import { StringLastIndexOfNode } from "@workflowhub/runtime/nodes/text/string-last-index-of-node";
import { StringNormalizeNode } from "@workflowhub/runtime/nodes/text/string-normalize-node";
import { StringSubstringNode } from "@workflowhub/runtime/nodes/text/string-substring-node";
import { StringToLowerCaseNode } from "@workflowhub/runtime/nodes/text/string-to-lower-case-node";
import { StringToUpperCaseNode } from "@workflowhub/runtime/nodes/text/string-to-upper-case-node";
import { StringTrimNode } from "@workflowhub/runtime/nodes/text/string-trim-node";
import { ToJsonNode } from "@workflowhub/runtime/nodes/text/to-json-node";
import { ToStringNode } from "@workflowhub/runtime/nodes/text/to-string-node";
import { TwilioSmsNode } from "@workflowhub/runtime/nodes/text/twilio-sms-node";
import { VarStringTemplateNode } from "@workflowhub/runtime/nodes/text/var-string-template-node";
import { AppendVideosNode } from "@workflowhub/runtime/nodes/video/append-videos-node";
import { ClipVideoNode } from "@workflowhub/runtime/nodes/video/clip-video-node";
import { ExtractFirstFrameNode } from "@workflowhub/runtime/nodes/video/extract-first-frame-node";
import { ExtractFrameAtTimeNode } from "@workflowhub/runtime/nodes/video/extract-frame-at-time-node";
import { ExtractLastFrameNode } from "@workflowhub/runtime/nodes/video/extract-last-frame-node";
import { OverlayImageOnVideoNode } from "@workflowhub/runtime/nodes/video/overlay-image-on-video-node";
import { BotMarkAsReadWhatsAppNode } from "@workflowhub/runtime/nodes/whatsapp/bot-mark-as-read-whatsapp-node";
import { BotReceiveWhatsAppMessageNode } from "@workflowhub/runtime/nodes/whatsapp/bot-receive-whatsapp-message-node";
import { BotSendImageWhatsAppNode } from "@workflowhub/runtime/nodes/whatsapp/bot-send-image-whatsapp-node";
import { BotSendMessageWhatsAppNode } from "@workflowhub/runtime/nodes/whatsapp/bot-send-message-whatsapp-node";
import { BotSendTemplateWhatsAppNode } from "@workflowhub/runtime/nodes/whatsapp/bot-send-template-whatsapp-node";
import { SearchMediaWikiNode } from "@workflowhub/runtime/nodes/wikipedia/search-mediawiki-node";
import { SearchWikipediaNode } from "@workflowhub/runtime/nodes/wikipedia/search-wikipedia-node";
import { CreatePostWordPressNode } from "@workflowhub/runtime/nodes/wordpress/create-post-wordpress-node";
import { CreateTagWordPressNode } from "@workflowhub/runtime/nodes/wordpress/create-tag-wordpress-node";
import { DeletePostWordPressNode } from "@workflowhub/runtime/nodes/wordpress/delete-post-wordpress-node";
import { GetPostWordPressNode } from "@workflowhub/runtime/nodes/wordpress/get-post-wordpress-node";
import { GetSiteWordPressNode } from "@workflowhub/runtime/nodes/wordpress/get-site-wordpress-node";
import { ListCategoriesWordPressNode } from "@workflowhub/runtime/nodes/wordpress/list-categories-wordpress-node";
import { ListPostsWordPressNode } from "@workflowhub/runtime/nodes/wordpress/list-posts-wordpress-node";
import { SearchWordPressNode } from "@workflowhub/runtime/nodes/wordpress/search-wordpress-node";
import { UpdatePostWordPressNode } from "@workflowhub/runtime/nodes/wordpress/update-post-wordpress-node";
import { UploadMediaWordPressNode } from "@workflowhub/runtime/nodes/wordpress/upload-media-wordpress-node";
import { CreatePageNotionNode } from "@workflowhub/runtime/nodes/notion/create-page-notion-node";
import { QueryDatabaseNotionNode } from "@workflowhub/runtime/nodes/notion/query-database-notion-node";
import { UpdatePageNotionNode } from "@workflowhub/runtime/nodes/notion/update-page-notion-node";
import { DeletePostXNode } from "@workflowhub/runtime/nodes/x/delete-post-x-node";
import { FollowUserXNode } from "@workflowhub/runtime/nodes/x/follow-user-x-node";
import { GetPostXNode } from "@workflowhub/runtime/nodes/x/get-post-x-node";
import { GetUserXNode } from "@workflowhub/runtime/nodes/x/get-user-x-node";
import { LikePostXNode } from "@workflowhub/runtime/nodes/x/like-post-x-node";
import { ListFollowersXNode } from "@workflowhub/runtime/nodes/x/list-followers-x-node";
import { ListFollowingXNode } from "@workflowhub/runtime/nodes/x/list-following-x-node";
import { ListUserMentionsXNode } from "@workflowhub/runtime/nodes/x/list-user-mentions-x-node";
import { ListUserPostsXNode } from "@workflowhub/runtime/nodes/x/list-user-posts-x-node";
import { RepostXNode } from "@workflowhub/runtime/nodes/x/repost-x-node";
import { SearchPostsXNode } from "@workflowhub/runtime/nodes/x/search-posts-x-node";
import { SharePostXNode } from "@workflowhub/runtime/nodes/x/share-post-x-node";
import type { Bindings } from "../context";

export class CloudflareNodeRegistry extends BaseNodeRegistry<Bindings> {
  protected registerNodes(): void {
    // Initialize environment feature flags as local variables
    const hasCloudflare = !!(
      this.env.CLOUDFLARE_ACCOUNT_ID && this.env.CLOUDFLARE_API_TOKEN
    );
    const hasTwilioSms = !!(
      this.env.TWILIO_ACCOUNT_SID &&
      this.env.TWILIO_AUTH_TOKEN &&
      this.env.TWILIO_PHONE_NUMBER
    );
    const hasSendEmail = !!(this.env.SEND_EMAIL && this.env.SEND_EMAIL_FROM);
    const hasGoogleMail = !!(
      this.env.INTEGRATION_GOOGLE_MAIL_CLIENT_ID &&
      this.env.INTEGRATION_GOOGLE_MAIL_CLIENT_SECRET
    );
    const hasGoogleCalendar = !!(
      this.env.INTEGRATION_GOOGLE_CALENDAR_CLIENT_ID &&
      this.env.INTEGRATION_GOOGLE_CALENDAR_CLIENT_SECRET
    );
    const hasDiscord = !!(
      this.env.INTEGRATION_DISCORD_CLIENT_ID &&
      this.env.INTEGRATION_DISCORD_CLIENT_SECRET
    );

    const hasGitHub = !!(
      this.env.INTEGRATION_GITHUB_CLIENT_ID &&
      this.env.INTEGRATION_GITHUB_CLIENT_SECRET
    );
    const hasAirtable = !!(
      this.env.INTEGRATION_AIRTABLE_CLIENT_ID &&
      this.env.INTEGRATION_AIRTABLE_CLIENT_SECRET
    );
    const hasReddit = !!(
      this.env.INTEGRATION_REDDIT_CLIENT_ID &&
      this.env.INTEGRATION_REDDIT_CLIENT_SECRET
    );
    const hasLinkedIn = !!(
      this.env.INTEGRATION_LINKEDIN_CLIENT_ID &&
      this.env.INTEGRATION_LINKEDIN_CLIENT_SECRET
    );
    const hasX = !!(
      this.env.INTEGRATION_X_CLIENT_ID && this.env.INTEGRATION_X_CLIENT_SECRET
    );
    const hasWordPress = !!(
      this.env.INTEGRATION_WORDPRESS_CLIENT_ID &&
      this.env.INTEGRATION_WORDPRESS_CLIENT_SECRET
    );
    const hasSlack = !!(
      this.env.INTEGRATION_SLACK_CLIENT_ID &&
      this.env.INTEGRATION_SLACK_CLIENT_SECRET
    );
    const hasNotion = !!(
      this.env.INTEGRATION_NOTION_CLIENT_ID &&
      this.env.INTEGRATION_NOTION_CLIENT_SECRET
    );

    // Register all core nodes
    this.registerImplementation(HttpRequestNode);
    this.registerImplementation(HttpWebhookNode);
    this.registerImplementation(FormRequestNode);
    this.registerImplementation(FormWebhookNode);
    this.registerImplementation(FormResponseNode);
    this.registerImplementation(JsonBodyNode);
    this.registerImplementation(TestAllTypesNode);
    this.registerImplementation(SendQueueMessageNode);
    this.registerImplementation(SendQueueBatchNode);
    this.registerImplementation(ReceiveQueueMessageNode);
    this.registerImplementation(DatabaseCreateTableNode);
    this.registerImplementation(DatabaseDeleteRowNode);
    this.registerImplementation(DatabaseDescribeTableNode);
    this.registerImplementation(DatabaseDropTableNode);
    this.registerImplementation(DatabaseExecuteNode);
    this.registerImplementation(DatabaseExportTableNode);
    this.registerImplementation(DatabaseGetRowCountNode);
    this.registerImplementation(DatabaseGetRowNode);
    this.registerImplementation(DatabaseImportTableNode);
    this.registerImplementation(DatabaseListTablesNode);
    this.registerImplementation(DatabasePutRowNode);
    this.registerImplementation(DatabaseQueryNode);
    this.registerImplementation(DatabaseRowExistsNode);
    this.registerImplementation(DatabaseTableExistsNode);
    this.registerImplementation(DatabaseTruncateTableNode);
    this.registerImplementation(ParquetQueryNode);
    this.registerImplementation(ReceiveEmailNode);
    this.registerImplementation(BotReceiveDiscordMessageNode);
    this.registerImplementation(BotReceiveTelegramMessageNode);
    this.registerImplementation(ReceiveScheduledTriggerNode);
    this.registerImplementation(ParseEmailNode);
    this.registerImplementation(ExtractEmailAttachmentsNode);
    this.registerImplementation(GetEmailThreadNode);
    this.registerImplementation(AdditionNode);
    this.registerImplementation(SubtractionNode);
    this.registerImplementation(MultiplicationNode);
    this.registerImplementation(DivisionNode);
    this.registerImplementation(ModuloNode);
    this.registerImplementation(ExponentiationNode);
    this.registerImplementation(SquareRootNode);
    this.registerImplementation(AbsoluteValueNode);
    this.registerImplementation(CalculatorNode);
    this.registerImplementation(SumNode);
    this.registerImplementation(MaxNode);
    this.registerImplementation(MinNode);
    this.registerImplementation(AvgNode);
    this.registerImplementation(MedianNode);
    this.registerImplementation(RandomChoiceNode);
    this.registerImplementation(RandomNumberNode);
    this.registerImplementation(RandomStringNode);
    this.registerImplementation(RandomUuidNode);
    this.registerImplementation(TextInputNode);
    this.registerImplementation(ToStringNode);
    this.registerImplementation(NumberInputNode);
    this.registerImplementation(SliderInputNode);
    this.registerImplementation(ImageUrlLoaderNode);
    this.registerImplementation(JsonAggNode);
    this.registerImplementation(ExtractItemNode);
    this.registerImplementation(AggregateItemsNode);
    this.registerImplementation(JsonExtractStringNode);
    this.registerImplementation(JsonExtractBooleanNode);
    this.registerImplementation(JsonExtractNumberNode);
    this.registerImplementation(JsonExtractObjectNode);
    this.registerImplementation(JsonExtractAllNode);
    this.registerImplementation(JsonExecuteJavascriptNode);
    this.registerImplementation(JsonTemplateNode);
    this.registerImplementation(JsonInputNode);

    // Date nodes
    this.registerImplementation(DateInputNode);
    this.registerImplementation(NowDateNode);
    this.registerImplementation(ParseDateNode);
    this.registerImplementation(AddDateNode);
    this.registerImplementation(DiffDateNode);
    this.registerImplementation(JsonArrayLengthNode);
    this.registerImplementation(JsonContainsNode);
    this.registerImplementation(JsonContainsPathNode);
    this.registerImplementation(JsonFlattenNode);
    this.registerImplementation(JsonInsertNode);
    this.registerImplementation(JsonKeysNode);
    this.registerImplementation(JsonMergeNode);
    this.registerImplementation(JsonObjectAggNode);
    this.registerImplementation(JsonObjectKeysNode);
    this.registerImplementation(JsonObjectValuesNode);
    this.registerImplementation(JsonRemoveNode);
    this.registerImplementation(JsonReplaceNode);
    this.registerImplementation(JsonSetNode);
    this.registerImplementation(JsonStripNullsNode);
    this.registerImplementation(JsonToBlobNode);
    this.registerImplementation(JsonToGeojsonNode);
    this.registerImplementation(JsonTypeofNode);
    this.registerImplementation(JsonSchemaComposeNode);
    this.registerImplementation(JsonSchemaExtractNode);
    this.registerImplementation(JsonValidNode);
    this.registerImplementation(JsonStringTemplateNode);
    this.registerImplementation(VarStringTemplateNode);
    this.registerImplementation(JavaScriptInputNode);
    this.registerImplementation(JavascriptNode);
    this.registerImplementation(CanvasInputNode);
    this.registerImplementation(ExifReaderNode);
    this.registerImplementation(WebcamInputNode);

    // String operations
    this.registerImplementation(StringConcatNode);
    this.registerImplementation(StringEqualsNode);
    this.registerImplementation(StringIncludesNode);
    this.registerImplementation(StringIndexOfNode);
    this.registerImplementation(StringLastIndexOfNode);
    this.registerImplementation(StringNormalizeNode);
    this.registerImplementation(StringSubstringNode);
    this.registerImplementation(StringToLowerCaseNode);
    this.registerImplementation(StringToUpperCaseNode);
    this.registerImplementation(StringTrimNode);
    this.registerImplementation(RegexMatchNode);
    this.registerImplementation(RegexExtractNode);
    this.registerImplementation(RegexReplaceNode);
    this.registerImplementation(RegexSplitNode);
    this.registerImplementation(ToJsonNode);
    this.registerImplementation(BooleanInputNode);
    this.registerImplementation(ConditionalForkNode);
    this.registerImplementation(ConditionalJoinNode);
    this.registerImplementation(SwitchForkNode);
    this.registerImplementation(SwitchJoinNode);
    this.registerImplementation(CreateFormNode);
    this.registerImplementation(CreateFeedbackFormNode);
    this.registerImplementation(WaitForFormNode);

    // Image operations
    this.registerImplementation(PhotonAddNoiseNode);
    this.registerImplementation(PhotonAdjustBrightnessNode);
    this.registerImplementation(PhotonAdjustContrastNode);
    this.registerImplementation(PhotonAdjustHslLightnessNode);
    this.registerImplementation(PhotonAdjustHueNode);
    this.registerImplementation(PhotonAdjustSaturationNode);
    this.registerImplementation(PhotonAlterRGBChannelsNode);
    this.registerImplementation(PhotonApplyFilterNode);
    this.registerImplementation(PhotonBlendImagesNode);
    this.registerImplementation(PhotonCropNode);
    this.registerImplementation(PhotonEdgeDetectionNode);
    this.registerImplementation(PhotonEmbossNode);
    this.registerImplementation(PhotonFitNode);
    this.registerImplementation(PhotonFlipImageNode);
    this.registerImplementation(PhotonGaussianBlurNode);
    this.registerImplementation(PhotonGrayscaleNode);
    this.registerImplementation(PhotonImageInfoNode);
    this.registerImplementation(PhotonInvertColorsNode);
    this.registerImplementation(PhotonMixWithColorNode);
    this.registerImplementation(PhotonOilPaintingNode);
    this.registerImplementation(PhotonPadNode);
    this.registerImplementation(PhotonPixelizeNode);
    this.registerImplementation(PhotonResizeNode);
    this.registerImplementation(PhotonRotateImageNode);
    this.registerImplementation(PhotonSepiaNode);
    this.registerImplementation(PhotonSharpenNode);
    this.registerImplementation(PhotonThresholdNode);
    this.registerImplementation(PhotonWatermarkNode);
    this.registerImplementation(SvgToPngNode);

    // Generic Replicate model node
    this.registerImplementation(ReplicateModelNode);

    // Generic Cloudflare Workers AI model node
    this.registerImplementation(CloudflareModelNode);

    // Generic Cloudflare Gateway (unified author/model) node
    this.registerImplementation(CloudflareGatewayModelNode);

    // Video processing nodes (Cloudflare Containers)
    if (this.env.FFMPEG_CONTAINER) {
      this.registerImplementation(AppendVideosNode);
      this.registerImplementation(ClipVideoNode);
      this.registerImplementation(ExtractFrameAtTimeNode);
      this.registerImplementation(ExtractFirstFrameNode);
      this.registerImplementation(ExtractLastFrameNode);
      this.registerImplementation(OverlayImageOnVideoNode);
    }

    // Multi-language sandbox nodes (Cloudflare Containers)
    if (this.env.SANDBOX) {
      this.registerImplementation(PythonNode);
      this.registerImplementation(BashNode);
      this.registerImplementation(NodejsNode);
      this.registerImplementation(TypescriptNode);
      this.registerImplementation(GoNode);
      this.registerImplementation(CNode);
      this.registerImplementation(RustNode);
      this.registerImplementation(JavaNode);
    }

    this.registerImplementation(AudioInputNode);
    this.registerImplementation(AudioRecorderInputNode);
    this.registerImplementation(ImageInputNode);
    this.registerImplementation(BlobInputNode);
    this.registerImplementation(DocumentInputNode);
    this.registerImplementation(GltfInputNode);
    this.registerImplementation(GeoJSONInputNode);
    this.registerImplementation(VideoInputNode);
    this.registerImplementation(SecretInputNode);

    this.registerImplementation(CsvExtractColumnNode);
    this.registerImplementation(CsvFilterRowsNode);
    this.registerImplementation(CsvParseNode);
    this.registerImplementation(CsvStringifyNode);
    this.registerImplementation(ToMarkdownNode);
    this.registerImplementation(FileNode);
    this.registerImplementation(BlobToFormDataNode);
    this.registerImplementation(BlobToJsonNode);
    this.registerImplementation(BlobToTextNode);
    this.registerImplementation(JsonToBlobNode);
    this.registerImplementation(TextToBlobNode);
    this.registerImplementation(FetchNode);
    this.registerImplementation(HttpResponseNode);

    // Search nodes
    this.registerImplementation(SearchWikipediaNode);
    this.registerImplementation(SearchMediaWikiNode);

    // Tavily nodes
    if (this.env.TAVILY_API_KEY) {
      this.registerImplementation(SearchTavilyNode);
      this.registerImplementation(ExtractTavilyNode);
    }

    // Google API nodes
    if (this.env.GOOGLE_API_KEY) {
      this.registerImplementation(AirQualityGoogleNode);
      this.registerImplementation(WeatherGoogleNode);
      this.registerImplementation(PollenGoogleNode);
      this.registerImplementation(ElevationGoogleNode);
      this.registerImplementation(PlacesGoogleNode);
      this.registerImplementation(GeocodingGoogleNode);
      this.registerImplementation(TimezoneGoogleNode);
    }

    // Specification test nodes (multi-step)
    this.registerImplementation(MultiStepAdditionNode);
    this.registerImplementation(FailingMultiStepNode);

    // Conditional registrations based on environment
    if (hasCloudflare) {
      this.registerImplementation(CloudflareBrowserContentNode);
      this.registerImplementation(CloudflareBrowserCrawlNode);
      this.registerImplementation(CloudflareBrowserCrawlQueueNode);
      this.registerImplementation(CloudflareBrowserJsonNode);
      this.registerImplementation(CloudflareBrowserLinksNode);
      this.registerImplementation(CloudflareBrowserMarkdownNode);
      this.registerImplementation(CloudflareBrowserPdfNode);
      this.registerImplementation(CloudflareBrowserScreenshotNode);
      this.registerImplementation(CloudflareBrowserScrapeNode);
      this.registerImplementation(CloudflareBrowserSnapshotNode);
    }

    if (hasTwilioSms) {
      this.registerImplementation(TwilioSmsNode);
    }

    if (hasSendEmail) {
      this.registerImplementation(SendEmailNode);
      // Email coordination agent — sends + waits for replies via Durable Object
      this.registerImplementation(EmailAgentClaudeSonnet4Node);
    }

    if (hasGoogleMail) {
      // gmail.send scope only (non-restricted)
      this.registerImplementation(SendEmailGoogleMailNode);

      // Restricted scopes - require Google security audit
      // if (this.developerMode) {
      //   this.registerImplementation(CreateReplyDraftGoogleMailNode);
      //   this.registerImplementation(CheckDraftGoogleMailNode);
      //   this.registerImplementation(SendDraftGoogleMailNode);
      //   this.registerImplementation(DeleteDraftGoogleMailNode);
      //   this.registerImplementation(UpdateDraftGoogleMailNode);
      //   this.registerImplementation(ReadInboxGoogleMailNode);
      //   this.registerImplementation(MarkMessageGoogleMailNode);
      //   this.registerImplementation(ModifyLabelsGoogleMailNode);
      //   this.registerImplementation(SearchMessagesGoogleMailNode);
      //   this.registerImplementation(GetMessageGoogleMailNode);
      //   this.registerImplementation(ArchiveMessageGoogleMailNode);
      //   this.registerImplementation(TrashMessageGoogleMailNode);
      // }
    }

    if (hasGoogleCalendar) {
      this.registerImplementation(CreateEventGoogleCalendarNode);
      this.registerImplementation(ListEventsGoogleCalendarNode);
      this.registerImplementation(GetEventGoogleCalendarNode);
      this.registerImplementation(UpdateEventGoogleCalendarNode);
      this.registerImplementation(DeleteEventGoogleCalendarNode);
      this.registerImplementation(SearchEventsGoogleCalendarNode);
      this.registerImplementation(AddAttendeesGoogleCalendarNode);
      this.registerImplementation(CheckAvailabilityGoogleCalendarNode);
      this.registerImplementation(QuickAddGoogleCalendarNode);
      this.registerImplementation(ListCalendarsGoogleCalendarNode);
    }

    if (hasDiscord) {
      this.registerImplementation(SendMessageDiscordNode);
      this.registerImplementation(SendDMDiscordNode);
      this.registerImplementation(GetChannelDiscordNode);
      this.registerImplementation(ListGuildChannelsDiscordNode);
      this.registerImplementation(GetGuildDiscordNode);
      this.registerImplementation(ListUserGuildsDiscordNode);
      this.registerImplementation(AddReactionDiscordNode);
    }

    this.registerImplementation(BotSendMessageDiscordNode);
    this.registerImplementation(BotSendDMDiscordNode);
    this.registerImplementation(BotAddReactionDiscordNode);

    this.registerImplementation(BotSendMessageTelegramNode);
    this.registerImplementation(BotSendPhotoTelegramNode);
    this.registerImplementation(BotForwardMessageTelegramNode);
    this.registerImplementation(BotGetChatTelegramNode);

    this.registerImplementation(BotReceiveWhatsAppMessageNode);
    this.registerImplementation(BotSendMessageWhatsAppNode);
    this.registerImplementation(BotSendImageWhatsAppNode);
    this.registerImplementation(BotSendTemplateWhatsAppNode);
    this.registerImplementation(BotMarkAsReadWhatsAppNode);

    this.registerImplementation(BotReceiveSlackMessageNode);
    this.registerImplementation(BotSendMessageSlackNode);
    this.registerImplementation(BotAddReactionSlackNode);

    // Slack integration nodes (OAuth)
    if (hasSlack) {
      this.registerImplementation(SendMessageSlackNode);
      this.registerImplementation(CreateChannelSlackNode);
      this.registerImplementation(ListChannelsSlackNode);
    }

    if (hasReddit) {
      this.registerImplementation(GetPostRedditNode);
      this.registerImplementation(GetSubredditRedditNode);
      this.registerImplementation(GetUserRedditNode);
      this.registerImplementation(ListCommentsRedditNode);
      this.registerImplementation(ListPostsRedditNode);
      this.registerImplementation(ListUserCommentsRedditNode);
      this.registerImplementation(ListUserPostsRedditNode);
      this.registerImplementation(SearchRedditNode);
      this.registerImplementation(SearchSubredditsRedditNode);
      this.registerImplementation(SubmitCommentRedditNode);
      this.registerImplementation(SharePostRedditNode);
      this.registerImplementation(VoteRedditNode);
    }

    if (hasX) {
      this.registerImplementation(SharePostXNode);
      this.registerImplementation(DeletePostXNode);
      this.registerImplementation(FollowUserXNode);
      this.registerImplementation(GetPostXNode);
      this.registerImplementation(GetUserXNode);
      this.registerImplementation(LikePostXNode);
      this.registerImplementation(ListFollowersXNode);
      this.registerImplementation(ListFollowingXNode);
      this.registerImplementation(ListUserMentionsXNode);
      this.registerImplementation(ListUserPostsXNode);
      this.registerImplementation(RepostXNode);
      this.registerImplementation(SearchPostsXNode);
    }

    if (hasLinkedIn) {
      this.registerImplementation(SharePostLinkedInNode);
      this.registerImplementation(GetProfileLinkedInNode);
      this.registerImplementation(CommentOnPostLinkedInNode);
      this.registerImplementation(LikePostLinkedInNode);
      this.registerImplementation(GetPostCommentsLinkedInNode);
      this.registerImplementation(GetPostLikesLinkedInNode);
    }

    if (hasGitHub) {
      this.registerImplementation(GetRepositoryGithubNode);
      this.registerImplementation(GetUserGithubNode);
      this.registerImplementation(SearchRepositoriesGithubNode);
      this.registerImplementation(StarRepositoryGithubNode);
      this.registerImplementation(UnstarRepositoryGithubNode);
      this.registerImplementation(FollowUserGithubNode);
      this.registerImplementation(UnfollowUserGithubNode);
      this.registerImplementation(GetFileContentsGithubNode);
      this.registerImplementation(CreateUpdateFileGithubNode);
      this.registerImplementation(DeleteFileGithubNode);
      this.registerImplementation(ListUserRepositoriesGithubNode);
      this.registerImplementation(ListOrganizationRepositoriesGithubNode);
      this.registerImplementation(CreateIssueGithubNode);
      this.registerImplementation(CreatePullRequestGithubNode);
      this.registerImplementation(ListRepositoriesGithubNode);
    }

    if (hasWordPress) {
      this.registerImplementation(ListPostsWordPressNode);
      this.registerImplementation(GetPostWordPressNode);
      this.registerImplementation(CreatePostWordPressNode);
      this.registerImplementation(UpdatePostWordPressNode);
      this.registerImplementation(DeletePostWordPressNode);
      this.registerImplementation(ListCategoriesWordPressNode);
      this.registerImplementation(CreateTagWordPressNode);
      this.registerImplementation(SearchWordPressNode);
      this.registerImplementation(UploadMediaWordPressNode);
      this.registerImplementation(GetSiteWordPressNode);
    }

    if (hasAirtable) {
      this.registerImplementation(CreateRecordAirtableNode);
      this.registerImplementation(UpdateRecordAirtableNode);
      this.registerImplementation(SearchRecordsAirtableNode);
    }

    if (hasNotion) {
      this.registerImplementation(CreatePageNotionNode);
      this.registerImplementation(QueryDatabaseNotionNode);
      this.registerImplementation(UpdatePageNotionNode);
    }

    // Dataset nodes
    this.registerImplementation(DatasetAiSearchNode);
    this.registerImplementation(DatasetDeleteFileNode);
    this.registerImplementation(DatasetDownloadFileNode);
    this.registerImplementation(DatasetListFilesNode);
    this.registerImplementation(DatasetSearchNode);
    this.registerImplementation(DatasetUploadFileNode);

    // 3D Tiles workflow nodes
    this.registerImplementation(DemToGltfNode);
    this.registerImplementation(GeoTiffDemQueryNode);
    this.registerImplementation(GeoTiffMetadataReaderNode);
    this.registerImplementation(GeoTiffQueryNode);
    this.registerImplementation(GeoTiffTransformNode);
    this.registerImplementation(GltfWireframeNode);

    // CSG Primitives
    this.registerImplementation(CgsCubeNode);
    this.registerImplementation(CgsSphereNode);
    this.registerImplementation(CgsCylinderNode);
    this.registerImplementation(CgsConeNode);
    this.registerImplementation(CgsTorusNode);

    // CSG Operations
    this.registerImplementation(CgsUnionNode);
    this.registerImplementation(CgsDifferenceNode);
    this.registerImplementation(CgsIntersectionNode);
    this.registerImplementation(CgsXorNode);

    // CSG Material & Texture
    this.registerImplementation(CgsApplyMaterialNode);
    this.registerImplementation(CgsApplyTextureNode);

    // CSG Transformations
    this.registerImplementation(CgsTranslateNode);
    this.registerImplementation(CgsRotateNode);
    this.registerImplementation(CgsScaleNode);

    // Geo nodes
    this.registerImplementation(AlongNode);
    this.registerImplementation(AngleNode);
    this.registerImplementation(AreaNode);
    this.registerImplementation(BboxClipNode);
    this.registerImplementation(BboxNode);
    this.registerImplementation(BboxPolygonNode);
    this.registerImplementation(BearingNode);
    this.registerImplementation(BooleanClockwiseNode);
    this.registerImplementation(BooleanConcaveNode);
    this.registerImplementation(BooleanContainsNode);
    this.registerImplementation(BooleanCrossesNode);
    this.registerImplementation(BooleanDisjointNode);
    this.registerImplementation(BooleanEqualNode);
    this.registerImplementation(BooleanIntersectsNode);
    this.registerImplementation(BooleanOverlapNode);
    this.registerImplementation(BooleanParallelNode);
    this.registerImplementation(BooleanPointInPolygonNode);
    this.registerImplementation(BooleanPointOnLineNode);
    this.registerImplementation(BooleanTouchesNode);
    this.registerImplementation(BooleanValidNode);
    this.registerImplementation(BooleanWithinNode);
    this.registerImplementation(BufferNode);
    this.registerImplementation(CenterMeanNode);
    this.registerImplementation(CenterMedianNode);
    this.registerImplementation(CenterNode);
    this.registerImplementation(CenterOfMassNode);
    this.registerImplementation(CentroidNode);
    this.registerImplementation(CircleNode);
    this.registerImplementation(CleanCoordsNode);
    this.registerImplementation(CombineNode);
    this.registerImplementation(ConcaveNode);
    this.registerImplementation(ConvexNode);
    this.registerImplementation(DestinationNode);
    this.registerImplementation(DifferenceNode);
    this.registerImplementation(DistanceNode);
    this.registerImplementation(EnvelopeNode);
    this.registerImplementation(ExplodeNode);
    this.registerImplementation(FeatureCollectionNode);
    this.registerImplementation(FeatureNode);
    this.registerImplementation(FlattenNode);
    this.registerImplementation(FlipNode);
    this.registerImplementation(GeometryCollectionNode);
    this.registerImplementation(GeoJsonNode);
    this.registerImplementation(GeoJsonToSvgNode);
    this.registerImplementation(GreatCircleNode);
    this.registerImplementation(IntersectNode);
    this.registerImplementation(KinksNode);
    this.registerImplementation(LengthNode);
    this.registerImplementation(LineArcNode);
    this.registerImplementation(LineChunkNode);
    this.registerImplementation(LineIntersectNode);
    this.registerImplementation(LineOffsetNode);
    this.registerImplementation(LineOverlapNode);
    this.registerImplementation(LineSegmentNode);
    this.registerImplementation(LineSliceAlongNode);
    this.registerImplementation(LineSliceNode);
    this.registerImplementation(LineSplitNode);
    this.registerImplementation(LineStringNode);
    this.registerImplementation(LineToPolygonNode);
    this.registerImplementation(MaskNode);
    this.registerImplementation(MidpointNode);
    this.registerImplementation(MultiLineStringNode);
    this.registerImplementation(MultiPointNode);
    this.registerImplementation(MultiPolygonNode);
    this.registerImplementation(NearestPointNode);
    this.registerImplementation(NearestPointOnLineNode);
    this.registerImplementation(PointNode);
    this.registerImplementation(PointOnFeatureNode);
    this.registerImplementation(PointToLineDistanceNode);
    this.registerImplementation(PointToPolygonDistanceNode);
    this.registerImplementation(PolygonNode);
    this.registerImplementation(PolygonSmoothNode);
    this.registerImplementation(PolygonTangentsNode);
    this.registerImplementation(PolygonToLineNode);
    this.registerImplementation(PolygonizeNode);
    this.registerImplementation(RewindNode);
    this.registerImplementation(RhumbBearingNode);
    this.registerImplementation(RhumbDestinationNode);
    this.registerImplementation(RhumbDistanceNode);
    this.registerImplementation(RoundNode);
    this.registerImplementation(SectorNode);
    this.registerImplementation(ShortestPathNode);
    this.registerImplementation(SimplifyNode);
    this.registerImplementation(SquareNode);
    this.registerImplementation(TransformRotateNode);
    this.registerImplementation(TransformScaleNode);
    this.registerImplementation(TransformTranslateNode);
    this.registerImplementation(TruncateNode);
    this.registerImplementation(UnionNode);
    this.registerImplementation(UnkinkPolygonNode);
    this.registerImplementation(VoronoiNode);
    this.registerImplementation(WktGeometryNode);

    // OpenAI models - always register (users can provide API keys via secrets)
    this.registerImplementation(Gpt41Node);
    this.registerImplementation(Gpt5Node);
    this.registerImplementation(Gpt5MiniNode);
    this.registerImplementation(Gpt5NanoNode);

    // Anthropic Claude nodes - always register (users can provide API keys via secrets)
    this.registerImplementation(ClaudeOpus41Node);
    this.registerImplementation(ClaudeOpus4Node);
    this.registerImplementation(ClaudeSonnet4Node);
    this.registerImplementation(Claude37SonnetNode);
    this.registerImplementation(Claude35SonnetNode);
    this.registerImplementation(Claude35HaikuNode);
    this.registerImplementation(Claude3OpusNode);

    // Google Gemini nodes - always register (users can provide API keys via secrets)
    this.registerImplementation(Gemini25FlashNode);
    this.registerImplementation(Gemini25ProNode);
    this.registerImplementation(Gemini3FlashNode);
    this.registerImplementation(Gemini31ProNode);
    this.registerImplementation(Gemini25FlashImagePreviewNode);
    this.registerImplementation(Gemini31FlashImagePreviewNode);
    this.registerImplementation(Gemini3ProImagePreviewNode);
    this.registerImplementation(Gemini25FlashAudioUnderstandingNode);
    this.registerImplementation(Gemini25ProAudioUnderstandingNode);
    this.registerImplementation(Gemini25FlashImageUnderstandingNode);
    this.registerImplementation(Gemini25ProImageUnderstandingNode);
    this.registerImplementation(Gemini25FlashTtsNode);
    this.registerImplementation(ImagenNode);

    // Output/Widget nodes - always register (for displaying all parameter types)
    this.registerImplementation(TextOutputNode);
    this.registerImplementation(NumberOutputNode);
    this.registerImplementation(BooleanOutputNode);
    this.registerImplementation(DateOutputNode);
    this.registerImplementation(BlobOutputNode);
    this.registerImplementation(ImageOutputNode);
    this.registerImplementation(DocumentOutputNode);
    this.registerImplementation(AudioOutputNode);
    this.registerImplementation(VideoOutputNode);
    this.registerImplementation(GltfOutputNode);
    this.registerImplementation(JsonOutputNode);
    this.registerImplementation(GeoJSONOutputNode);
    this.registerImplementation(SecretOutputNode);
    this.registerImplementation(AnyOutputNode);

    // Agent nodes — multi-turn agentic execution via Durable Object
    this.registerImplementation(AgentClaudeSonnet4Node);
    this.registerImplementation(AgentGemini25FlashNode);
    this.registerImplementation(AgentGemini3FlashNode);
    this.registerImplementation(AgentGemini31ProNode);
    this.registerImplementation(AgentGpt41Node);
    this.registerImplementation(AgentQwen330BA3BFp8Node);
  }
}
