
import { defineComponent, ref } from 'vue';
import type { Response } from './api';

import { Card, Table, Space, Input, Button, InputSearch } from 'ant-design-vue';
import { SubfieldSpace, Subfield } from '@components/Subfield';
import { useTableAttrs, useColumns } from '@renderer/hooks';

const Cpt = defineComponent({
  setup(props, { attrs }) {
    const dataList = ref<Response[]>([]);

    const columns = useColumns<Response>([
      { title: '名称', dataIndex: 'name' },
      { title: '年龄', dataIndex: 'age' },
      { title: '源地址', dataIndex: ['data', 's_addr'] },
      { title: '目的地址', dataIndex: ['data', 'd_addr'] },
      { title: '操作', dataIndex: 'operator', customRender: () => {

        return <Button>编辑</Button>;
      } }
    ]);
    const { tableAttrs } = useTableAttrs({}, next => {
      dataList.value = [{
        name: 'asdad',
        age: 'sadasda',
        data: {
          s_addr: 'sadas',
          d_addr: 'asdssa'
        }
      }];
      next();
    });

    return () => <Card>
      <Subfield>
        <div>
          <Button>新建</Button>
        </div>
        <div><InputSearch placeholder={'请输入'} /></div>
      </Subfield>

      <Table
        dataSource={dataList.value}
        columns={columns.value}
        {...tableAttrs}
      >

      </Table>
    </Card>
  }
})


export default Cpt;
