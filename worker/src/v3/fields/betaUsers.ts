import MongoDataSource from "apollo-mongodb-datasource";
import { gql } from "apollo-server-core";

import { pmdDb } from "../../util/dataSources";

export const schema = gql`
	type Query {
		betaUsers: BetaUsers
	}

	type BetaUsers {
		number: Int
	}
`;

export class BetaUsers extends MongoDataSource {
	async has(userId: string) {
		return (await this.findOne({ userId })) !== null;
	}

	async add(userId: string) {
		return await pmdDb
			.collection("betaUsers")
			.updateOne({ userId }, { $set: { userId } }, { upsert: true });
	}
}
export function resolver(
	_: any,
	_1: any,
	{ dataSources: { betaUsers } }: { dataSources: { betaUsers: BetaUsers } }
) {
	return { number: betaUsers.count() };
}
