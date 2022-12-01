import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';
import { createHandler } from 'graphql-http/lib/use/fetch';

const schema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'Query',
		fields: {
			hello: {
				type: GraphQLString,
				resolve: () => 'world',
			},
		},
	}),
});

const handler = createHandler({ schema });

export interface Env {}

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		const [path, _search] = request.url.split('?');
		if (path.endsWith('/')) {
			return handler(request);
		} else {
			return new Response(null, { status: 404 });
		}
	},
};
