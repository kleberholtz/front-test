import { APP_NAME } from 'constants/app.constant'
import { Table } from 'components/ui'
import React, { useEffect, useState } from 'react'
import API from 'services/API'

const { THead, TBody, Tr, Th } = Table

const ItemList = (item) => {

	return (
		<Tr>
			<Th>Item 1</Th>
			<Th>Item 2</Th>
			<Th>Item 3</Th>
			<Th>Item 4</Th>
			<Th>Item 5</Th>
		</Tr>
	)
}

export default ItemList