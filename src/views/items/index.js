import { APP_NAME } from 'constants/app.constant'
import { Card, Button, Spinner, Notification, toast, Upload, Dialog, Pagination, Select, Table, Skeleton, FormItem, FormContainer, Input } from 'components/ui'
import { FcImageFile } from 'react-icons/fc'
import { Field, Form, Formik } from 'formik'
import { IoAdd, IoRefresh } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import API from 'services/API'
import ItemList from './itemList'
import React, { useEffect, useState } from 'react'

const { THead, TBody, Tr, Th, Td } = Table

const paginateOptions = [
	{ value: 20, label: '20 / página' },
	{ value: 40, label: '40 / página' },
	{ value: 60, label: '60 / página' },
	{ value: 80, label: '80 / página' },
]

const SkeletonRows = (rows) => {
	rows = rows || 1
	// return [...Array(rows).keys()].map((i) => <Td key={i}><Skeleton height={32} width={32} /></Td>)
	return (
		<>
			<Td><Skeleton height={32} width={32} /></Td>
			<Td><Skeleton height={8} width={42} /></Td>
			<Td><Skeleton height={8} width={72} /></Td>
			<Td><Skeleton height={8} width={32} /></Td>
			<Td><Skeleton height={8} width={50} /></Td>
			<Td><Skeleton height={8} width={58} /></Td>
		</>
	)
}

const SkeletonColumns = ({ columns, rows }) => {
	columns = columns || 6
	rows = rows || paginateOptions[0].value

	return [...Array(columns).keys()].map((i) => <Tr key={i}>{SkeletonRows(rows)}</Tr>)
}

const validationSchema = Yup.object().shape({
	name: Yup.string().required('Digite o nome do produto.').max(100, 'O nome do produto deve ter no máximo 100 caracteres.'),
	description: Yup.string().required('Digite a descrição do produto.').max(500, 'A descrição deve ter no máximo 500 caracteres.'),
	price: Yup.number().required('Digite o valor do produto.').min(0.01, 'O valor do produto deve ser maior que 0.01.').max(999999.99, 'O valor do produto deve ser menor que 999999.99.'),
	quantity_stock: Yup.number().required('Digite a quantidade em estoque.').min(1, 'A quantidade em estoque deve ser maior que 1.').max(999999, 'A quantidade em estoque deve ser menor que 999999.'),
	category: Yup.number().required('Selecione uma categoria.')
})

const Items = () => {
	useEffect(() => {
		document.title = `${APP_NAME} - Items`
	}, [])

	const refreshTime = 5000;

	const user = useSelector((state) => state.auth.user)
	const { t } = useTranslation()

	const [isLoading, setIsLoading] = useState(true)

	const [offset, setOffset] = useState(0)
	const [limit, setLimit] = useState(paginateOptions[0].value)
	const [page, setPage] = useState(1)

	const [sort, setSort] = useState('created_at')
	const [order, setOrder] = useState('desc')

	const [filter, setFilter] = useState('')
	const [filterValue, setFilterValue] = useState('')
	const [filterLiterally, setFilterLiterally] = useState(false)

	const [count, setCount] = useState(0)
	const [total, setTotal] = useState(0)

	const [items, setItems] = useState([])
	const [refresh, setRefresh] = useState(new Date())

	const [dialogCreate, setDialogCreate] = useState(false)

	useEffect(() => {
		API.Items.List(offset, limit, sort, order, filter, filterValue, filterLiterally).then((res) => {
			if (!res.success) {
				res.messages.map(msg => {
					if (msg.type === 'debug') {
						return
					}

					toast.push(<Notification closable duration={10000} type="danger">
						{msg.message}
					</Notification>, {
						placement: "top-center",
					});
				})
				return
			}

			setItems(res.data)
			setCount(res.data_info.count)
			setTotal(res.data_info.total)
		}).catch((err) => {
			// console.error(err)
		}).finally(() => {
			setIsLoading(false)
		})

		return () => {
		}
	}, [refresh, offset, limit, sort, order, filter, filterValue, filterLiterally])

	const doRefresh = () => {
		if (isLoading) {
			return
		}

		const untilTime = new Date() - refresh;
		if (untilTime < refreshTime) {
			const untilTimeFmt = Math.round((refreshTime - untilTime) / 1000 * 10) / 10
			toast.push(<Notification closable duration={1000} type="info">
				Aguarde {untilTimeFmt} segundos antes de atualizar novamente.
			</Notification>, {
				placement: "top-center",
			});
			return
		}

		setIsLoading(true)
		setRefresh(new Date())
	}

	const doPage = (page) => {
		setPage(page)
		setOffset((page - 1) * limit)
	}

	const handleNewProduct = () => {
	}

	const [images, setImages] = useState([])
	const handleUpload = (e) => {
		for (let i = 0; i < e.length; i++) {
			const file = e[i]

			if (file.size > 52428800) {
				toast.push(<Notification closable duration={15000} type="danger">
					{file.name} excede o tamanho máximo de 50MB.
				</Notification>, {
					placement: "top-center"
				});
				continue
			}

			if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
				toast.push(<Notification closable duration={15000} type="danger">
					{file.name} não é um formato de imagem válido.
				</Notification>, {
					placement: "top-center"
				});

				// remove file
				continue
			}
		}
	}

	console.log(user)

	return (
		<div className="flex flex-col">
			<div className="flex flex-col xs:flex-row xs:justify-between items-center gap-2">
				<h3>Produtos</h3>
				<div className="flex flex-col items-center gap-2">
					<Button size="sm" icon={<IoAdd />} onClick={() => setDialogCreate(true)}>Adicionar Produto</Button>
					<Dialog isOpen={dialogCreate} bodyOpenClassName="overflow-hidden" width={968} onClose={() => setDialogCreate(false)} onRequestClose={() => setDialogCreate(false)}>
						<div className="flex flex-col gap-2 mb-6">
							<h3>Adicionar novo produto</h3>
						</div>
						<Formik
							initialValues={{
								name: '',
								description: '',
								price: '',
								quantity_stock: '',
								category: '',
							}}
							validationSchema={validationSchema}
							onSubmit={(values, { setSubmitting }) => {
								setSubmitting(false)
							}}>
							{({ touched, errors, isSubmitting }) => (
								<Form>
									<FormContainer className="h-[420px]">
										<div className="flex flex-row gap-6">
											<div className="flex flex-col w-[600px] max-h-[380px] overflow-y-auto">
												<Upload draggable={true} className="min-h-40 h-40 max-h-52" accept="image/*" multiple={true} onChange={(e) => handleUpload(e)} uploadLimit={10}>
													<div className="my-16 text-center">
														<div className="text-6xl mb-4 flex justify-center">
															<FcImageFile />
														</div>
														<p className="font-semibold">
															<span className="text-gray-800 dark:text-white">
																Solte sua imagem aqui ou {' '}
															</span>
															<span className="text-blue-500">selecione</span>.
														</p>
														<p className="mt-1 opacity-60 dark:text-white">
															Formatos aceitos: jpeg, png, gif
														</p>
													</div>
												</Upload>
											</div>
											<div className="flex flex-col w-full">
												<FormItem invalid={errors.name && touched.name} errorMessage={errors.name}>
													<Field
														autoComplete="off"
														name="name"
														placeholder="Name"
														component={Input}
													/>
												</FormItem>
												<FormItem invalid={errors.description && touched.description} errorMessage={errors.description}>
													<Field
														autoComplete="off"
														name="description"
														placeholder="Descrição"
														maxLength={500}
														type="text"
														component={Input}
													/>
												</FormItem>
												<FormItem invalid={errors.price && touched.price} errorMessage={errors.price}>
													<Field
														autoComplete="off"
														name="price"
														placeholder="Preço"
														type="number"
														component={Input}
													/>
												</FormItem>
												<FormItem invalid={errors.quantity_stock && touched.quantity_stock} errorMessage={errors.quantity_stock}>
													<Field
														autoComplete="off"
														name="quantity_stock"
														placeholder="Quantidade em estoque"
														type="number"
														component={Input}
													/>
												</FormItem>
												<FormItem invalid={errors.category && touched.category} errorMessage={errors.category}>
													<Field
														autoComplete="off"
														name="category"
														placeholder="Categoria"
														component={Select}
													/>
												</FormItem>

												<Button block loading={isSubmitting} variant="solid" type="submit">
													{isSubmitting ? 'Registrando...' : 'Registrar'}
												</Button>
											</div>
										</div>

									</FormContainer>
								</Form>
							)}
						</Formik>


						<div className="flex flex-row gap-2 justify-between mt-4">
							<Button size="sm" onClick={() => setDialogCreate(false)}>Cancelar</Button>
							<Button size="sm" variant="twoTone" onClick={handleNewProduct}>Salvar</Button>
						</div>
					</Dialog>
				</div>
				<div className="flex justify-start flex-col xs:flex-row gap-1">
					{
						isLoading ? <Spinner size={20} className="mx-2 my-2" /> : <Button size="sm" icon={<IoRefresh />} onClick={doRefresh} />
					}
				</div>
			</div>

			<div className="mt-4 rounded-lg border border-gray-200 dark:border-gray-600">
				<Table className="z-0">
					<THead className="!bg-transparent">
						<Tr key="header">
							<Th key="images">
								<div className="flex flex-row items-center gap-2">
									#
								</div>
							</Th>
							<Th key="name">
								<div className="flex flex-row items-center gap-2">
									Nome
								</div>
							</Th>
							<Th key="description">
								<div className="flex flex-row items-center gap-2">
									Descrição
								</div>
							</Th>
							<Th key="price">
								<div className="flex flex-row items-center gap-2">
									Valor
								</div>
							</Th>
							<Th key="created_at">
								<div className="flex flex-row items-center gap-2">
									Adicionado em
								</div>
							</Th>
							<Th key="actions">
								<div className="flex flex-row items-center gap-2">
									Ações
								</div>
							</Th>
						</Tr>
					</THead>
					<TBody>
						{
							isLoading ? <SkeletonColumns columns={paginateOptions[0].value} rows={6} /> : count === 0 ? <Tr><Td colSpan={6}><p className="text-center">Nenhum registro encontrado.</p></Td></Tr> : items.map((item) => <ItemList item={item} key={item.id} />)
						}
					</TBody>
				</Table>
			</div>

			<Card className="mt-4">
				<div className="flex flex-col lg:flex-row items-center justify-between gap-2">
					<div className="flex flex-col gap-1">
						<label>Mostrando {count} resultados.</label>
						<label>De um total de {total} registros.</label>
					</div>
					<div className="flex flex-col lg:flex-row items-center justify-end gap-2">
						{count > 0 && total > 0 ? <Pagination pageSize={limit} total={total} currentPage={page} onChange={(e) => doPage(e)} /> : ''}
						<div className="w-full lg:w-36">
							<Select
								size="sm"
								isSearchable={false}
								defaultValue={paginateOptions[0]}
								options={paginateOptions}
								onChange={(e) => setLimit(e.value)}
							/>
						</div>
					</div>
				</div>
			</Card>
		</div>
	)
}

export default Items