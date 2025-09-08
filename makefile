# 开发环境前端打包
prod:
	@npm run build:prod
	@mv dist mioffice
	@tar -czf mioffice.tar.gz mioffice
	@mv mioffice dist